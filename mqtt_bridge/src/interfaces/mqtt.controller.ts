import { IBridgeUsecase } from 'application/bridge.usecase'

export type ControllerParams = {
  usecase: IBridgeUsecase
}

export function mqttController ({ usecase }: ControllerParams) {
  return function controller (topic: string, message: any) {
    let json: any
    try {
      json = JSON.parse(message.toString())
    } catch (err) {}

    usecase({ topic, data: json })
  }
}
