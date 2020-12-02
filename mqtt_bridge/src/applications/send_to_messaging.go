package services

import (
	"fmt"

	MQTT "github.com/eclipse/paho.mqtt.golang"

	frameworks "bridge/src/frameworks"
)

// SendToMessagingService ...
type SendToMessagingService struct {
	mqttClient *frameworks.MqttClient
	messaging  *frameworks.Messaging
}

func (s *SendToMessagingService) mqttHandler(client MQTT.Client, message MQTT.Message) {
	fmt.Println(message.Topic(), string(message.Payload()))
	fmt.Println()
	s.messaging.Pub("", "mqtt_bridge", false, false, message.Payload())
}

// Usecase ...
func (s *SendToMessagingService) Usecase() {

	s.mqttClient.RegisterEvent("misura/THK_GARMI1_MS01", 2, s.mqttHandler)
}

// NewSendToMessagingService ...
func NewSendToMessagingService(mqttClient *frameworks.MqttClient, messaging *frameworks.Messaging) *SendToMessagingService {
	return &SendToMessagingService{mqttClient: mqttClient, messaging: messaging}
}
