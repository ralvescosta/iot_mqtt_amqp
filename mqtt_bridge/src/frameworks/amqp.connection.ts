import amqp, { Channel } from 'amqplib/callback_api'

const queue = 'hello'
let amqpChannel: Channel

async function amqpConnectCallbackToPromise (): Promise<Channel> {
  // eslint-disable-next-line promise/param-names
  return new Promise((resolve, rejects) => {
    amqp.connect('amqp://rabbitmq:123456@127.0.0.1', function (error0, connection) {
      if (error0) {
        rejects(error0)
      }

      connection.createChannel(function (error1, channel) {
        if (error1) {
          rejects(error1)
        }

        channel.assertQueue(queue, {
          durable: true
        })

        // channel.sendToQueue(queue, Buffer.from('hello'))

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
