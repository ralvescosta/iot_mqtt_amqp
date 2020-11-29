import { bridgeUsecase, BridgeParams } from './bridge.usecase'

function makeSut () {
  const mqttChannelSpy: BridgeParams = {
    amqpChannel: {
      publish: jest.fn()
    }
  }
  const sut = bridgeUsecase(mqttChannelSpy)

  return {
    sut,
    mqttChannelSpy
  }
}

describe('BridgeUsecase', () => {
  it('usecase()', () => {
    const { sut, mqttChannelSpy } = makeSut()

    sut({ topic: 'some', data: { id: 10 } })

    expect(mqttChannelSpy.amqpChannel.publish).toHaveBeenCalledTimes(1)
  })
})
