package frameworks

import (
	"os"

	"github.com/streadway/amqp"
)

// Messaging ...
type Messaging struct {
	conn    *amqp.Connection
	channel *amqp.Channel
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

// Pub ...
func (s *Messaging) Pub(exchange string, routingKey string, mandatory bool, immediate bool, data []byte) error {

	err := s.channel.Publish(
		exchange,   // exchange = ""
		routingKey, // routing key = "queue name"
		mandatory,  // mandatory = false
		immediate,  // immediate = false
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        data,
		})

	if err != nil {
		return err
	}

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
