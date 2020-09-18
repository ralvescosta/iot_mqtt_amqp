import amqp, { Channel } from 'amqplib/callback_api'
import { exchangeName, queueName, routingKey } from '../env'

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

        channel.assertExchange(exchangeName, 'direct', { durable: true }, (err) => rejects(err))
        channel.assertQueue(queueName, { durable: true }, (err) => rejects(err))
        channel.bindQueue(queueName, exchangeName, routingKey, {}, (err) => rejects(err))

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
