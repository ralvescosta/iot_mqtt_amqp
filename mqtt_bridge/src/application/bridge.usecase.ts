export interface BridgeData {
  topic: string,
  data: object
}

export function bridgeUsecase ({ amqpChannel }: any) {
  return function (bridgeData: BridgeData) {
    console.log(bridgeData)
    return bridgeData
  }
}
