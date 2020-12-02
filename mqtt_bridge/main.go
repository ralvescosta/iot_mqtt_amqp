package main

import (
	"os"
	"os/signal"
	"syscall"

	applications "bridge/src/applications"
	frameworks "bridge/src/frameworks"
	controllers "bridge/src/interfaces"
)

func subscribers(mqttClient *frameworks.MqttClient) {

}

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

	mqttClient := frameworks.NewMqttClient()
	err = mqttClient.ConnectToMQTT()
	if err != nil {
		panic("MQTT Connection Err")
	}

	usecase := applications.NewSendToMessagingService(messaging)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	controller := controllers.NewMQTTSubscriber(usecase)
	mqttClient.Client.Subscribe(os.Getenv("MQTT_TOPIC"), 2, mqttClient.MQTTHandleAdapt(controller))
	<-c

}
