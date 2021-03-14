import * as fs from "fs";
import Checkers from "./checkFile";
import { jsonResponse, redingJson } from "./config.controller";

let audioPath: string;
let compressedPath: string;
let execPath: string;
let imagePath: string;
let textPath: string;
let videoPath: string;
let othersPath: string;

export default class RouteController {
  constructor() {
    redingJson().then(() => {
      audioPath = jsonResponse.audioFiles.routeFor;
      compressedPath = jsonResponse.compressedFiles.routeFor;
      execPath = jsonResponse.executableFiles.routeFor;
      imagePath = jsonResponse.imageFiles.routeFor;
      videoPath = jsonResponse.videoFiles.routeFor;
      textPath = jsonResponse.textFiles.routeFor;
      if (jsonResponse.othersFiles) {
        othersPath = jsonResponse.othersFiles.routeFor;
      }
    });
  }

  private async checkExist(path: string): Promise<string> {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    return path;
  }

  private async forAudio(): Promise<string> {
    return this.checkExist(audioPath);
  }

  private async forCompressed(): Promise<string> {
    return this.checkExist(compressedPath);
  }

  private async forExec(): Promise<string> {
    return this.checkExist(execPath);
  }

  private async forImage(): Promise<string> {
    return this.checkExist(imagePath);
  }

  private async forText(): Promise<string> {
    return this.checkExist(textPath);
  }

  private async forVideo(): Promise<string> {
    return this.checkExist(videoPath);
  }

  private async forUnknown(): Promise<string> {
    if (othersPath) {
      return othersPath;
    } else {
      return "unknow";
    }
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
      case await checker.isTextFile():
        return this.forText();
      case checker.isVideoFile():
        return this.forVideo();
      default:
        return this.forUnknown();
    }
  }
}
