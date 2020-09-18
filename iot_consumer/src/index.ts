import { connectToAMQP, getAMQPChannel } from './frameworks/amqp.connection'

import { amqpSubscriberRegister } from './presenters/amqp.subscribers'

async function bootstrap () {
  try {
    await connectToAMQP()
    console.log('AMQP CONNECTED')
  } catch (err) {
    console.log('AMQP CONNECTION ERR', err)
  }

  const amqpChannel = getAMQPChannel()
  amqpSubscriberRegister({ amqpChannel })
}

bootstrap()
