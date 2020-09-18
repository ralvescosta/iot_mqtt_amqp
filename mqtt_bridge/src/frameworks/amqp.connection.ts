import amqp, { Channel } from 'amqplib/callback_api'
import { mqttBridgeExchangeName, mqttBridgeQueueName, mqttBridgeRoutingKey } from '../env'

let amqpChannel: Channel

async function amqpConnectCallbackToPromise (): Promise<Channel> {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, rejects) => {
    amqp.connect('amqp://rabbitmq:123456@127.0.0.1', function (connError, connection) {
      if (connError) {
        rejects(connError)
      }

      connection.createChannel(function (channelError, channel) {
        if (channelError) {
          rejects(channelError)
        }

        channel.assertExchange(mqttBridgeExchangeName, 'direct', { durable: true }, (err) => rejects(err))
        channel.assertQueue(mqttBridgeQueueName, { durable: true }, (err) => rejects(err))
        channel.bindQueue(mqttBridgeQueueName, mqttBridgeExchangeName, mqttBridgeRoutingKey, {}, (err) => rejects(err))

        resolve(channel)
      })
    })
  })
}

async function connectToAMQP () {
  const channel = await amqpConnectCallbackToPromise()
  amqpChannel = channel
}

function getAMQPChannel (): Channel {
  if (!amqpChannel) {
    throw new Error('AMQP connection do not established')
  }
  return amqpChannel
}

export { connectToAMQP, getAMQPChannel }
