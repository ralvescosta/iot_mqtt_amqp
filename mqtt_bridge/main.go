package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
)

func main() {
	// MQTT.DEBUG = log.New(os.Stdout, "", 0)
	// MQTT.ERROR = log.New(os.Stdout, "", 0)

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	opts := MQTT.NewClientOptions()

	opts.AddBroker("test.mosquitto.org:1883")
	opts.SetClientID("go_bride_id_1237")
	opts.SetKeepAlive(60 * time.Second)
	opts.SetDefaultPublishHandler(MsgHandle)

	client := MQTT.NewClient(opts)
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}
	if token := client.Subscribe("misura/THK_GARMI1_MS01", 2, nil); token.Wait() && token.Error() != nil {
		fmt.Println(token.Error())
		os.Exit(1)
	}
	<-c

}

// MsgHandle ...
func MsgHandle(client MQTT.Client, message MQTT.Message) {
	fmt.Println(message.Topic(), string(message.Payload()))
}
