import * as fs from "fs";
import Checkers from "./checkFile";
import { readJson } from "./config.controller";
import { jsonResponse } from "./readConfi.controller";

export default class RouteController {
  private audioPath: string;
  private compressedPath: string;
  private execPath: string;
  private imagePath: string;
  private textPath: string;
  private videoPath: string;
  private otherPath?: string | undefined;

  constructor() {
    this.audioPath = jsonResponse.audioFiles.routeFor;
    this.compressedPath = jsonResponse.compressedFiles.routeFor;
    this.execPath = jsonResponse.executableFiles.routeFor;
    this.imagePath = jsonResponse.imageFiles.routeFor;
    this.textPath = jsonResponse.textFiles.routeFor;
    this.videoPath = jsonResponse.videoFiles.routeFor;
    if (jsonResponse.othersFiles) {
      this.otherPath = jsonResponse.othersFiles.routeFor;
    }
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

  async typeOf(ext: string, jsonPath): Promise<string> {
    const checker = new Checkers(ext, jsonPath);

    switch (true) {
      case checker.isAudioFile():
        return this.forAudio();
      case checker.isCompressedFile():
        return this.forCompressed();
      case checker.isExecutableFile():
        return this.forExec();
      case checker.isImageFile():
        return this.forImage();
      case await checker.isTextFile():
        return this.forText();
      case checker.isVideoFile():
        return this.forVideo();
      default:
        return "unknow";
    }
  }
}
