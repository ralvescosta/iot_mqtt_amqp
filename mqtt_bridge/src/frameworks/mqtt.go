package frameworks

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// MqttClient ...
type MqttClient struct {
	client MQTT.Client
}

// ConnectToMQTT ...
func (m *MqttClient) ConnectToMQTT() error {

	opts := MQTT.NewClientOptions()
	opts.AddBroker(os.Getenv("MQTT_URL"))
	opts.SetClientID("go_bride_id_1237")
	opts.SetKeepAlive(60 * time.Second)

	m.client = MQTT.NewClient(opts)
	if token := m.client.Connect(); token.Wait() && token.Error() != nil {
		return token.Error()
	}

	return nil
}

func (*MqttClient) logger() {
	MQTT.DEBUG = log.New(os.Stdout, "", 0)
	MQTT.ERROR = log.New(os.Stdout, "", 0)
}

// RegisterEvent ...
func (m *MqttClient) RegisterEvent(topic string, qos uint8, handler MQTT.MessageHandler) error {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	if token := m.client.Subscribe(topic, qos, handler); token.Wait() && token.Error() != nil {
		return token.Error()
	}

	<-c

	return nil
}

// NewMqttClient ...
func NewMqttClient() *MqttClient {
	return &MqttClient{}
}
