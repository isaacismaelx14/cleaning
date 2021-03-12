import { promises } from "original-fs";
import FileController from "./extra/file.controller";

export default class OrganizeFiles {
  private fileController: FileController;
  private filesToMove: IFileToMove[] = [];

  constructor() {
    this.fileController = new FileController();
  }

  async start(path: string): Promise<IFinalResut> {
    let message: IFinalResut = {
      messageType: "Error",
      message: "Error desconocido Code 1-Unknoun",
    };

    if (await this.gettingFiles(path))
      await this.fileController
        .checkingFiles(this.filesToMove)
        .then(() => {})
        .then(async () => {
          message = await this.moveFiles();
        })
        .catch((message) => {});
    else
      message = {
        messageType: "Warning",
        message: "Las rutas no contienen ningun archivo",
      };
    return message;
  }

  private async gettingFiles(path: string): Promise<boolean> {
    const fController = this.fileController;
    const files: IFilesComplement[] = await fController.readFromPath(path);
    if (files.length === 0) {
      return false;
    } else {
      this.filesToMove = await fController.checkType(files, path);
      return true;
    }
  }

  private async moveFiles(): Promise<IFinalResut> {
    let lMessage: IFinalResut = {
      messageType: "Error",
      message: "Error desconocido Code 0-Unknoun",
    };
    await this.fileController
      .moveFiles(this.filesToMove)
      .then(async (message) => {
        lMessage = {
          messageType: "Success",
          message: await message,
        };
      })
      .catch(async (message) => {
        lMessage = {
          messageType: "Error",
          message: await message,
        };
      });
    return lMessage;
  }
}
