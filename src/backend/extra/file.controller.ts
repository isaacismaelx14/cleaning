import RouteController from "./routes.controller";
import * as fs from "fs";
import * as os from "os";

const cpus: number = os.cpus().length;
const waitTime: number = cpus <= 2 ? 25 : cpus <= 4 ? 13 : cpus <= 6 ? 10 : 5;
console.log(waitTime);

export default class FileController {
  private routeController: RouteController;

  private counterRenamed: number = 0;
  private renameIdent: string = "-(r";
  /*Use this only when you developing your app to disable default functions
  
  All "TRUE" of default*/
  private devOptions = {
    doMove: false,
    doRename: false,
  };

  constructor() {
    //Dev options
    //------------------->
    if (this.devOptions.doMove == false || this.devOptions.doRename === false) {
      console.warn("some of the devOptions are set to false", false);
    }
    //<-------------------
    this.routeController = new RouteController();
  }

  public async checkType(
    files: IFilesComplement[],
    initialRoute: string,
    jsonPath: string
  ): Promise<IFileToMove[]> {
    let preFilesToMove: IFileToMove[] = [];
    for (let i: number = 0; i < files.length; i++) {
      const { unstructured } = files[i];
      const finalPath = await this.routeController.typeOf(
        unstructured.ext,
        jsonPath
      );

      if (initialRoute)
        preFilesToMove.push({
          initialPath: initialRoute,
          finalPath: finalPath,
          file: files[i],
        });
    }

    return preFilesToMove;
  }

  public moveFiles(files: IFileToMove[]) {
    return new Promise((resolve, reject) => {
      try {
        for (let i: number = 0; i < files.length; i++) {
          const { file, finalPath, initialPath } = files[i];
          const { fileName } = file;
          const oldPath = initialPath + fileName;
          const newPath = finalPath + fileName;

          //devOptions.doRename can disable the action of rename files
          setTimeout(() => {
            if (this.devOptions.doRename) {
              fs.renameSync(oldPath, newPath);
            }
          }, 500);
        }
        resolve(files);
      } catch (error) {
        reject(`Ha ocurrido un error moviendo el archivo ${error}`);
      }
    });
  }

  public readFromPath(path): Promise<IFilesComplement[]> {
    return new Promise((resolve) => {
      const result: string[] = fs.readdirSync(path);

      this.unstructuredFiles(result).then((result) => {
        resolve(result);
      });
    });
  }

  public checkingFiles(filesToMove: IFileToMove[]): Promise<IFinalResut | any> {
    return new Promise(async (resolve, reject) => {
      try {
        for (let i: number = 0; i < filesToMove.length; i++) {
          const lastFileName = filesToMove[i].file.fileName;
          const checker = await this.chechIfFileExist(filesToMove[i]);

          const { newName, change } = checker;

          if (change) {
            if (newName) {
              const newFileName =
                newName + filesToMove[i].file.unstructured.ext;

              filesToMove[i].file.lastName = lastFileName;
              filesToMove[i].file.unstructured.name = newName;
              filesToMove[i].file.fileName = newFileName;
              filesToMove[i].file.renamed = true;
            }
          }
        }
        resolve(this.doFileRename(filesToMove));
      } catch (error) {
        reject(`Ha ocurrido un error leyendo los archios`);
        console.error(error);
      }
    });
  }

  private unstructuredFiles(files: string[] = []): Promise<IFilesComplement[]> {
    return new Promise((resolve) => {
      let filesComplements: IFilesComplement[] = [];
      for (let i: number = 0; i < files.length; i++) {
        if (files[i].includes(".")) {
          const fileComplements = files[i].split(".");
          setTimeout(() => {
            filesComplements.push({
              fileName: files[i],
              renamed: false,
              unstructured: {
                name: fileComplements[0],
                ext: "." + fileComplements[fileComplements.length - 1],
              },
            });
          }, waitTime);
        }
      }
      setTimeout(() => {
        resolve(filesComplements);
      }, waitTime * files.length);
    });
  }

  private async chechIfFileExist(
    fileToMove: IFileToMove
  ): Promise<IRenameFile> {
    const { file, finalPath } = fileToMove;
    const { fileName } = file;

    if (fs.existsSync(finalPath + fileName)) {
      return {
        change: true,
        newName: await this.renameFile(fileToMove),
      };
    }
    return {
      change: false,
    };
  }

  private async renameFile(fileToMove: IFileToMove): Promise<string> {
    this.counterRenamed++;

    const { file, finalPath } = fileToMove;
    const { name } = file.unstructured;

    const numb: number = await this.checkIfRenamedBefore(finalPath, name);
    const newName: string = `${name}${this.renameIdent}${numb})`;
    return newName;
  }

  private async checkIfRenamedBefore(finalPath: string, name: string) {
    const finalPahtFiles = fs.readdirSync(finalPath);
    let number: number = 1;
    for (let i: number = 0; i < finalPahtFiles.length; i++) {
      if (finalPahtFiles[i].includes(this.renameIdent)) {
        const preName1: string[] = finalPahtFiles[i].split(this.renameIdent);
        if (preName1[0] === name) {
          const preName2: string[] = preName1[1].split(")");
          number = parseInt(preName2[0]) + 1;
        }
      }
    }
    return number;
  }

  private doFileRename(fileToMove: IFileToMove[]) {
    let interWaitTime = waitTime;
    return new Promise((resolve, reject) => {
      try {
        for (let i: number = 0; i < fileToMove.length; i++) {
          if (fileToMove[i].file.renamed) {
            const { initialPath } = fileToMove[i];
            const { lastName, fileName } = fileToMove[i].file;
            const oldPath = initialPath + lastName;
            const newPath = initialPath + fileName;
            //devOptions.doMove can disable the action of move files
            if (this.devOptions.doMove) {
              setTimeout(() => {
                fs.renameSync(oldPath, newPath);
              }, waitTime);
            } else {
              interWaitTime = 0;
            }
          }
        }
        setTimeout(() => {
          resolve("Se han renombrando los archivos con exito");
        }, interWaitTime * fileToMove.length);
      } catch (error) {
        reject("Ha ocurrido un error leyendo los archios > " + error);
      }
    });
  }
}
