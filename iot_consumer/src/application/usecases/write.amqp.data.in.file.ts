import { IFSWriteInFile } from '../protocols/iwrite.in.file'

export class WriteAMQPDataInFileUsecase {
  constructor (
    private readonly writeInJson: IFSWriteInFile
  ) {}

  public async writeToJson (data: any): Promise<boolean> {
    await this.writeInJson.write(data)
    return true
  }
}
