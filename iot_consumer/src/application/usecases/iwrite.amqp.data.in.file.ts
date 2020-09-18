export interface IWriteAMQPDataInFileUsecase {
  writeToJson: (data: any) => Promise<boolean>
}
