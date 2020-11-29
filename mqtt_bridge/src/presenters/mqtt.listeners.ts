import { bridgeUsecase } from '../application/bridge.usecase'
import { mqttController } from '../interfaces/mqtt.controller'

export type MqttListenerParams = {
  mqttConnection: {
    on: (s1: string, s2: (...args: any) => void) => void
  };
  amqpChannel: {
    publish: (s1: string, s2: string, s3: Buffer, s4: object) => void
  }
}

export function mqttListenersRegister ({ mqttConnection, amqpChannel }: MqttListenerParams): void {
  mqttConnection.on('connect', () => {
    console.log('connected')
  })

  const usecase = bridgeUsecase({ amqpChannel })
  const controller = mqttController({ usecase })
  mqttConnection.on('message', controller)
}
