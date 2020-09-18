import { Channel } from 'amqplib/callback_api'

export interface BridgeData {
  topic: string,
  data: object
}
const exchangeName = 'mqtt_bridge'

type Params = {
  amqpChannel: Channel
}

export type IBridgeUsecase = {
  (bridgeData: BridgeData): void
}

export function bridgeUsecase ({ amqpChannel }: Params): IBridgeUsecase {
  return function (bridgeData: BridgeData): void {
    console.log(bridgeData)
    amqpChannel.publish(exchangeName, 'mqtt_bridge_bridge', Buffer.from(JSON.stringify(bridgeData)), { expiration: '20000' })
  }
}
