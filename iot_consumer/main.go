package main

import (
	frameworks "consumer/src/frameworks"
	interfaces "consumer/src/interfaces"
	"os"
)

func main() {
	err := frameworks.RegisterEnvFile()
	if err != nil {
		panic("Env Config Err")
	}

	messaging := frameworks.NewMessaging()
	err = messaging.Connect()
	if err != nil {
		panic("RabbitMQ Connection Err")
	}

	controller := interfaces.NewController()

	messaging.Sub(os.Getenv("AMQP_QUEUE"), controller)
}
