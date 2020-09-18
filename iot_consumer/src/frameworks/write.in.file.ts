import { IFSWriteInFile } from '../application/protocols/iwrite.in.file'

export class FSWriteInJson implements IFSWriteInFile {
  public async write (data: any): Promise<void> {
    console.log(data)
  }
}
