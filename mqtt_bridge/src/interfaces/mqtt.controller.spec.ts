import { mqttController, ControllerParams } from './mqtt.controller'

function makeSut () {
  const usecaseSpy: ControllerParams = {
    usecase: jest.fn()
  }
  const sut = mqttController(usecaseSpy)

  return {
    sut,
    usecaseSpy
  }
}

describe('MqttController', () => {
  it('controller()', () => {
    const { sut, usecaseSpy } = makeSut()

    sut('some', { id: 10 })

    expect(usecaseSpy.usecase).toHaveBeenCalledTimes(1)
  })
})
