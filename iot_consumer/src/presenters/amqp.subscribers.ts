import { Channel } from 'amqplib/callback_api'
import { mqttBridgeQueueName } from '../env'

import { WriteAMQPDataInFileUsecase } from '../application/usecases/write.amqp.data.in.file'
import { WriteInJsonController } from '../interfaces/write.in.json.controller'
import { FSWriteInJson } from '../frameworks/write.in.file'

type Params = {
  amqpChannel: Channel;
}

export function amqpSubscriberRegister ({ amqpChannel }: Params) {
  const writeInJson = new FSWriteInJson()
  const writeInJsonUsecase = new WriteAMQPDataInFileUsecase(writeInJson)
  const writeInJsonController = new WriteInJsonController(writeInJsonUsecase)

  amqpChannel.consume(mqttBridgeQueueName, function (msg: any) {
    writeInJsonController.handle(msg)
  },
  {
    noAck: true
  })
}
