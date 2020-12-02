package frameworks

import (
	"log"
	"os"

	"github.com/streadway/amqp"
)

// Messaging ...
type Messaging struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

// IController ...
type IController interface {
	Handle(data []byte) bool
}

// Connect ...
func (s *Messaging) Connect() error {
	conn, err := amqp.Dial(os.Getenv("AMQP_URL"))
	if err != nil {
		return err
	}

	ch, err := conn.Channel()
	if err != nil {
		return err
	}

	_, err = ch.QueueDeclare(
		os.Getenv("AMQP_QUEUE"), // name
		false,                   // durable
		false,                   // delete when unused
		false,                   // exclusive
		false,                   // no-wait
		nil,                     // arguments
	)
	if err != nil {
		return err
	}

	s.conn = conn
	s.channel = ch

	return nil
}

// Sub ...
func (s *Messaging) Sub(controller IController) error {

	msgs, err := (*s.channel).Consume(
		"hello", // queue
		"",      // consumer
		true,    // auto-ack
		false,   // exclusive
		false,   // no-local
		false,   // no-wait
		nil,     // args
	)
	if err != nil {
		return err
	}

	forever := make(chan bool)

	go func() {
		for d := range msgs {
			controller.Handle(d.Body)
		}
	}()
	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever

	return nil
}

// Defer ...
func (s *Messaging) Defer() {
	defer s.channel.Close()
	defer s.conn.Close()
}

// NewMessaging ..
func NewMessaging() *Messaging {
	return &Messaging{}
}
