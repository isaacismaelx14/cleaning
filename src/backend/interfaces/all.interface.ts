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
  message: unknown;
}
type unstructured = {
  name: string;
  ext: string;
};
type messageType = "Success" | "Error" | "Warning";
