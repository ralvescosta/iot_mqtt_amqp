import { Channel } from 'amqplib/callback_api'
import { exchangeName, routingKey, publishExpiration } from '../env'

export interface BridgeData {
  topic: string,
  data: object
}

type Params = {
  amqpChannel: Channel
}

export type IBridgeUsecase = {
  (bridgeData: BridgeData): void
}

export function bridgeUsecase ({ amqpChannel }: Params): IBridgeUsecase {
  return function (bridgeData: BridgeData): void {
    console.log(bridgeData)
    amqpChannel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(bridgeData)), { expiration: publishExpiration })
  }
}
