import { bridgeUsecase } from '../application/bridge.usecase'
import { mqttController } from '../interfaces/mqtt.controller'

export function mqttListenersRegister ({ mqttConnection, amqpChannel }: any) {
  mqttConnection.on('connect', () => {
    console.log('connected')
  })

  const usecase = bridgeUsecase({ amqpChannel })
  const controller = mqttController({ usecase })
  mqttConnection.on('message', controller)
}
