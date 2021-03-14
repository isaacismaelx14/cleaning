import { jsonResponse, redingJson } from "./readConfi.controller";

let jsonPath: string = __dirname + "\\json\\files.config.json";

async function main() {
  await redingJson(jsonPath);
}

export default class Checkers {
  private ext: string;
  private textFiles: string[] = jsonResponse.textFiles.files;
  private audioFiles: string[] = jsonResponse.audioFiles.files;
  private compressedFiles: string[] = jsonResponse.compressedFiles.files;
  private imageFiles: string[] = jsonResponse.imageFiles.files;
  private videoFiles: string[] = jsonResponse.videoFiles.files;
  private executableFiles: string[] = jsonResponse.executableFiles.files;

  constructor(ext: string, path: string) {
    this.ext = ext;
    jsonPath = path;
  }

  public isTextFile(): boolean {
    try {
      if (this.textFiles.find((textExt) => textExt == this.ext)) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public isImageFile(): boolean {
    try {
      if (this.imageFiles.find((Element) => Element == this.ext)) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public isAudioFile(): boolean {
    try {
      if (this.audioFiles.find((Element) => Element == this.ext)) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public isCompressedFile(): boolean {
    try {
      if (this.compressedFiles.find((Element) => Element == this.ext))
        return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public isVideoFile(): boolean {
    try {
      if (this.videoFiles.find((Element) => Element == this.ext)) return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  public isExecutableFile(): boolean {
    try {
      if (this.executableFiles.find((Element) => Element == this.ext))
        return true;
      else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

main();
