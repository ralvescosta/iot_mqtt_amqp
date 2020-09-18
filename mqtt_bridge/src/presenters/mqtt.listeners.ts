import { Channel } from 'amqplib/callback_api'
import { MqttClient } from 'mqtt'

import { bridgeUsecase } from '../application/bridge.usecase'
import { mqttController } from '../interfaces/mqtt.controller'

type Params = {
  mqttConnection:MqttClient;
  amqpChannel: Channel;
}

export function mqttListenersRegister ({ mqttConnection, amqpChannel }: Params) {
  mqttConnection.on('connect', () => {
    console.log('connected')
  })

  const usecase = bridgeUsecase({ amqpChannel })
  const controller = mqttController({ usecase })
  mqttConnection.on('message', controller)
}
