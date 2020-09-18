import { Channel } from 'amqplib/callback_api'
import { mqttBridgeExchangeName, mqttBridgeRoutingKey, mqttBridgePublishExpiration } from '../env'

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
    amqpChannel.publish(mqttBridgeExchangeName, mqttBridgeRoutingKey, Buffer.from(JSON.stringify(bridgeData)), { expiration: mqttBridgePublishExpiration })
    console.count('published')
  }
}
