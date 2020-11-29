import { mqttBridgeExchangeName, mqttBridgeRoutingKey, mqttBridgePublishExpiration } from '../env'

export interface BridgeData {
  topic: string,
  data: object
}

export type BridgeParams = {
  amqpChannel: {
    publish: (s1: string, s2: string, s3: Buffer, s4: object) => void
  }
}

export type IBridgeUsecase = {
  (bridgeData: BridgeData): void
}

export function bridgeUsecase ({ amqpChannel }: BridgeParams): IBridgeUsecase {
  return function usecase (bridgeData: BridgeData): void {
    amqpChannel.publish(mqttBridgeExchangeName, mqttBridgeRoutingKey, Buffer.from(JSON.stringify(bridgeData)), { expiration: mqttBridgePublishExpiration })
    console.count('published')
  }
}
