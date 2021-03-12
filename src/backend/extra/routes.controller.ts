import * as fs from "fs";
import Checkers from "./checkFile";

export default class RouteController {
  private audioPath: string;
  private compressedPath: string;
  private execPath: string;
  private imagePath: string;
  private textPath: string;
  private videoPath: string;

  constructor() {
    this.audioPath = "C:\\Users\\isaac\\Music\\";
    this.compressedPath = "C:\\Users\\isaac\\Downloads\\";
    this.execPath = "C:\\Users\\isaac\\Downloads\\";
    this.imagePath = "C:\\Users\\isaac\\Pictures\\";
    this.textPath = "C:\\Users\\isaac\\Documents\\Commond Documents\\";
    this.videoPath = "C:\\Users\\isaac\\Videos\\";
  }

  private async checkExist(path: string): Promise<string> {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    return path;
  }

  private async forAudio(): Promise<string> {
    return this.checkExist(this.audioPath);
  }

  private async forCompressed(): Promise<string> {
    return this.checkExist(this.compressedPath);
  }

  private async forExec(): Promise<string> {
    return this.checkExist(this.execPath);
  }

  private async forImage(): Promise<string> {
    return this.checkExist(this.imagePath);
  }

  private async forText(): Promise<string> {
    return this.checkExist(this.textPath);
  }

  private async forVideo(): Promise<string> {
    return this.checkExist(this.videoPath);
  }

  async typeOf(ext: string): Promise<string> {
    const checker = new Checkers(ext);
    switch (true) {
      case checker.isAudioFile():
        return this.forAudio();
      case checker.isCompressedFile():
        return this.forCompressed();
      case checker.isExecutableFile():
        return this.forExec();
      case checker.isImageFile():
        return this.forImage();
      case checker.isTextFile():
        return this.forText();
      case checker.isVideoFile():
        return this.forVideo();
      default:
        return "unknow";
    }
  }
}
