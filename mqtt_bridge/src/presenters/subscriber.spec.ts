import { mqttSubscribeOnSpecificTopics, MqttSubscribeOnSpecificTopicsParams } from './subscriber'

describe('mqttSubscribeOnSpecificTopics', () => {
  it('mqttSubscribeOnSpecificTopics()', () => {
    const mqttSubscribeParams: MqttSubscribeOnSpecificTopicsParams = {
      mqttConnection: {
        subscribe: jest.fn()
      }
    }

    mqttSubscribeOnSpecificTopics(mqttSubscribeParams)

    expect(mqttSubscribeParams.mqttConnection.subscribe).toHaveBeenCalledTimes(1)
  })
})
