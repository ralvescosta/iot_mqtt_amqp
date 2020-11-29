import { mqttListenersRegister, MqttListenerParams } from './mqtt.listeners'

describe('mqttListenersRegister', () => {
  it('mqttListenersRegister()', () => {
    const paramsSpy: MqttListenerParams = {
      mqttConnection: {
        on: jest.fn()
      },
      amqpChannel: {
        publish: jest.fn()
      }
    }

    mqttListenersRegister(paramsSpy)

    expect(paramsSpy.mqttConnection.on).toHaveBeenCalledTimes(2)
  })
})
