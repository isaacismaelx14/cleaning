interface IFilesComplement {
  fileName: string;
  renamed: boolean;
  lastName?: string;
  unstructured: {
    name: string;
    ext: string;
  };
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

type messageType = "Success" | "Error" | "Warning";
