package main

func main() {
	messageService := NewMessageService()

	mqttService := NewMqttService(messageService)
	mqttService.ConnectToMQTT()

}
