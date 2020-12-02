package frameworks

import (
	"log"
	"os"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

// MqttClient ...
type MqttClient struct {
	Client MQTT.Client
}

// IController ...
type IController interface {
	Handle(topic string, payload []byte) error
}

// ConnectToMQTT ...
func (m *MqttClient) ConnectToMQTT() error {

	opts := MQTT.NewClientOptions()
	opts.AddBroker(os.Getenv("MQTT_URL"))
	opts.SetClientID("go_bride_id_1237")
	opts.SetKeepAlive(60 * time.Second)

	m.Client = MQTT.NewClient(opts)
	if token := m.Client.Connect(); token.Wait() && token.Error() != nil {
		return token.Error()
	}

	return nil
}

func (*MqttClient) logger() {
	MQTT.DEBUG = log.New(os.Stdout, "", 0)
	MQTT.ERROR = log.New(os.Stdout, "", 0)
}

// MQTTHandleAdapt ...
func (*MqttClient) MQTTHandleAdapt(controller IController) func(client MQTT.Client, message MQTT.Message) {
	return func(client MQTT.Client, message MQTT.Message) {
		controller.Handle(message.Topic(), message.Payload())
	}
}

// NewMqttClient ...
func NewMqttClient() *MqttClient {
	return &MqttClient{}
}
