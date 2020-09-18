import { IWriteAMQPDataInFileUsecase } from '../application/usecases/iwrite.amqp.data.in.file'

export class WriteInJsonController {
  constructor (
    private readonly writeInJsonUsecase: IWriteAMQPDataInFileUsecase
  ) {}

  public async handle (amqpData: any): Promise<boolean> {
    if (amqpData) {
      const content = JSON.parse(amqpData.content)
      await this.writeInJsonUsecase.writeToJson(content)
    }
    return true
  }
}
