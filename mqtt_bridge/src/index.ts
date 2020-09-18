import { connectToMqtt, getMqttConnection } from './frameworks/mqtt.connection'
import { connectToAMQP, getAMQPChannel } from './frameworks/amqp.connection'

import { mqttSubscribeOnSpecificTopics } from './presenters/subscriber'
import { mqttListenersRegister } from './presenters/mqtt.listeners'

async function bootstrap () {
  try {
    await connectToMqtt()
    console.log('MQTT CONNECTED')
  } catch (err) {
    console.log('MQTT CONNECTION ERR', err)
  }

  try {
    await connectToAMQP()
    console.log('AMQP CONNECTED')
  } catch (err) {
    console.log('AMQP CONNECTION ERR', err)
  }

  const mqttConnection = getMqttConnection()
  const amqpChannel = getAMQPChannel()
  mqttSubscribeOnSpecificTopics({ mqttConnection })
  mqttListenersRegister({ mqttConnection, amqpChannel })
}

bootstrap()
