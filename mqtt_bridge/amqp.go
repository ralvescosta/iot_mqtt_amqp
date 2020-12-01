package main

import "github.com/streadway/amqp"

// MessageService ...
type MessageService struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

// Connect ...
func (s *MessageService) Connect() error {
	conn, err := amqp.Dial("amqp://rabbitmq:123456@localhost:5672/")
	if err != nil {
		return err
	}

	ch, err := conn.Channel()
	if err != nil {
		return err
	}

	_, err = ch.QueueDeclare(
		"mqtt_bridge", // name
		false,         // durable
		false,         // delete when unused
		false,         // exclusive
		false,         // no-wait
		nil,           // arguments
	)
	if err != nil {
		return err
	}

	s.conn = conn
	s.channel = ch

	return nil
}

// Pub ...
func (s *MessageService) Pub(exchange string, routingKey string, mandatory bool, immediate bool, data []byte) error {

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
func (s *MessageService) Defer() {
	defer s.channel.Close()
	defer s.conn.Close()
}

// NewMessageService ..
func NewMessageService() *MessageService {
	return &MessageService{}
}
