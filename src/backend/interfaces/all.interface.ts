interface IFilesComplement {
  fileName: string;
  renamed: boolean;
  lastName?: string;
  unstructured: unstructured;
}

interface IFileToMove {
  initialPath: string;
  finalPath: string;
  file: IFilesComplement;
}

interface IRenameFile {
  change: boolean;
  newName?: string;
}

interface IFinalResut {
  messageType: messageType;
  message: any;
}
type unstructured = {
  name: string;
  ext: string;
};

type messageType = "Success" | "Error" | "Warning";
type IAppState = "doing" | "none" | messageType;
