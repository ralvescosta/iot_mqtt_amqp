import { IBridgeUsecase } from 'application/bridge.usecase'

type Params = {
  usecase: IBridgeUsecase
}

export function mqttController ({ usecase }: Params) {
  return function (topic: string, message: any) {
    let json: any
    try {
      json = JSON.parse(message.toString())
    } catch (err) {}

    usecase({ topic, data: json })
  }
}
