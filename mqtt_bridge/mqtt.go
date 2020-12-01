package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// MqttService ...
type MqttService struct {
	client         MQTT.Client
	messageService *MessageService
}

// ConnectToMQTT ...
func (m *MqttService) ConnectToMQTT() {
	// MQTT.DEBUG = log.New(os.Stdout, "", 0)
	// MQTT.ERROR = log.New(os.Stdout, "", 0)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	opts := MQTT.NewClientOptions()

	opts.AddBroker("test.mosquitto.org:1883")
	opts.SetClientID("go_bride_id_1237")
	opts.SetKeepAlive(60 * time.Second)
	opts.SetDefaultPublishHandler(m.MsgHandle)

	m.client = MQTT.NewClient(opts)
	if token := m.client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	m.Subscribe("misura/THK_GARMI1_MS01", 2, nil)
	<-c
}

// Subscribe ...
func (m *MqttService) Subscribe(topic string, qos uint8, controller MQTT.MessageHandler) {
	if token := m.client.Subscribe(topic, qos, controller); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		os.Exit(1)
	}
}

// MsgHandle ...
func (m *MqttService) MsgHandle(client MQTT.Client, message MQTT.Message) {
	fmt.Println(message.Topic(), string(message.Payload()))
	(m.messageService).Pub("", "mqtt_bridge", false, false, message.Payload())
}

// NewMqttService ...
func NewMqttService(messageService *MessageService) *MqttService {
	return &MqttService{messageService: messageService}
}
