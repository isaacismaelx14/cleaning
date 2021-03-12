import RouteController from "./routes.controller";
import * as fs from "fs";

export default class FileController {
  private routeController: RouteController;
  private counterRenamed: number = 0;

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
    initialRoute: string
  ): Promise<IFileToMove[]> {
    let preFilesToMove: IFileToMove[] = [];
    for (let i: number = 0; i < files.length; i++) {
      const { unstructured } = files[i];
      const finalPath = await this.routeController.typeOf(unstructured.ext);

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
          if (this.devOptions.doRename) {
            fs.renameSync(oldPath, newPath);
          }
        }
        resolve(files);
      } catch (error) {
        reject(`Ha ocurrido un error moviendo el archivo ${error}`);
      }
    });
  }

  public async readFromPath(path): Promise<IFilesComplement[]> {
    const result: string[] = fs.readdirSync(path);

    const unstructuredFile: IFilesComplement[] = await this.unstructuredFiles(
      result
    );

    return unstructuredFile;
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

  private async unstructuredFiles(
    files: string[] = []
  ): Promise<IFilesComplement[]> {
    let filesComplements: IFilesComplement[] = [];
    for (let i: number = 0; i < files.length; i++) {
      if (files[i].includes(".")) {
        const fileComplements = files[i].split(".");
        filesComplements.push({
          fileName: files[i],
          renamed: false,
          unstructured: {
            name: fileComplements[0],
            ext: "." + fileComplements[1],
          },
        });
      }
    }
    return filesComplements;
  }

  private async chechIfFileExist(
    fileToMove: IFileToMove
  ): Promise<IRenameFile> {
    const { file, finalPath } = fileToMove;
    const { fileName } = file;

    if (fs.existsSync(finalPath + fileName)) {
      return {
        change: true,
        newName: this.renameFile(fileToMove),
      };
    }
    return {
      change: false,
    };
  }

  private renameFile(fileToMove: IFileToMove): string {
    this.counterRenamed++;
    const { file } = fileToMove;
    const { name } = file.unstructured;
    const newName: string = `${name}-(r${this.counterRenamed})`;

    return newName;
  }

  private checkIfRenamedBefore(name: string) {
    if (name.includes("-(r")) {
      const preName1: string[] = name.split("-(r");
      console.log(preName1);
    }
  }

  private doFileRename(fileToMove: IFileToMove[]) {
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
              fs.renameSync(oldPath, newPath);
            }
          }
        }
        resolve("Se han renombrando los archivos con exito");
      } catch (error) {
        reject("Ha ocurrido un error leyendo los archios > " + error);
      }
    });
  }
}
