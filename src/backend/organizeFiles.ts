import { readJson } from "./extra/config.controller";
import FileController from "./extra/file.controller";

export default class OrganizeFiles {
  private fileController: FileController;
  private filesToMove?: Promise<IFileToMove[]>;

  constructor() {
    this.fileController = new FileController();
  }

  async start(path: string, jsonPath: string): Promise<IFinalResut> {
    return new Promise((resolve, reject) => {
      let message: IFinalResut = {
        messageType: "Error",
        message: "Error desconocido Code 1-Unknoun",
      };

      this.gettingFiles(path, jsonPath)
        .then(async (m) => {
          if (this.filesToMove) {
            this.fileController
              .checkingFiles(await this.filesToMove)
              .then(() => {})
              .then(async () => {
                message = await this.moveFiles();
                resolve(message);
              })
              .catch((messageE) => {
                message.message = messageE;
                reject(message);
              });
          }
        })
        .catch((e) => {
          message = {
            messageType: "Warning",
            message: "Las rutas no contienen ningun archivo",
          };
          reject(message);
        });
    });
  }

  private gettingFiles(path: string, jsonPath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const fController = this.fileController;
      fController.readFromPath(path).then(async (result) => {
        if (result.length === 0) {
          reject(false);
        } else {
          this.filesToMove = fController.checkType(result, path, jsonPath);
          resolve(true);
        }
      });
    });
  }

  private async moveFiles(): Promise<IFinalResut> {
    let lMessage: IFinalResut = {
      messageType: "Error",
      message: "Error desconocido Code 0-Unknoun",
    };
    if (this.filesToMove) {
      await this.fileController
        .moveFiles(await this.filesToMove)
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
    }
    return lMessage;
  }
}
