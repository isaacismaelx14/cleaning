export default class Checkers {
  private ext:string;
  private textFiles: string[] = [
    ".txt",
    ".doc",
    ".docx",
    "pptx",
    ".odt",
    ".docm",
    ".pdf",
    ".rtf",
  ];
  private audioFiles: string[]  = [
    ".aif",
    ".cda",
    ".mid",
    ".midi",
    ".mp3",
    ".mpa",
    ".ogg",
    ".wav",
    ".wma",
    ".wpl",
  ];

  private compressedFiles: string[]  = [".7z", ".rar", ".zip"];
  private imageFiles: string[]  = [".jpg", ".jpeg", ".png", ".gif", ".ico", ".tiff"];
  private videoFiles: string[]  = [".avi", ".flv", ".mov", ".mp4", ".wmv", ".m4v"];
  private executableFiles: string[]  = [".exe", ".msi"];

  constructor(ext:string) {
    this.ext = ext;
  }

  public isTextFile():boolean  {
    if (this.textFiles.find((textExt) => textExt == this.ext)) return true;
    else return false;
  }
  public isImageFile():boolean  {
    if (this.imageFiles.find((Element) => Element == this.ext)) return true;
    else return false;
  }
  public isAudioFile():boolean  {
    if (this.audioFiles.find((Element) => Element == this.ext)) return true;
    else return false;
  }
  public isCompressedFile():boolean  {
    if (this.compressedFiles.find((Element) => Element == this.ext))return true;
      else return false;
  }
  public isVideoFile():boolean  {
    if (this.videoFiles.find((Element) => Element == this.ext)) return true;
    else return false;
  }
  public isExecutableFile():boolean {
    if (this.executableFiles.find((Element) => Element == this.ext))return true;
    else return false;
  }
}
