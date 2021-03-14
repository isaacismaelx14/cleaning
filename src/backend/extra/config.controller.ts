import * as fs from "fs";
import * as os from "os";
import { PathLike } from "original-fs";

const jsonBase = require("../json/files.base.json");

export default function configController(path: string) {
  const resp: jsonRe = jsonBase;
  // const path: PathLike = __dirname + "\\json\\files.config.json";
  const homePath: PathLike = os.homedir();

  const createJson: jsonRe = {
    audioFiles: {
      files: resp.audioFiles.files,
      routeFor: homePath + resp.audioFiles.routeFor,
    },
    compressedFiles: {
      files: resp.compressedFiles.files,
      routeFor: homePath + resp.compressedFiles.routeFor,
    },
    imageFiles: {
      files: resp.imageFiles.files,
      routeFor: homePath + resp.imageFiles.routeFor,
    },
    executableFiles: {
      files: resp.executableFiles.files,
      routeFor: homePath + resp.executableFiles.routeFor,
    },
    textFiles: {
      files: resp.textFiles.files,
      routeFor: homePath + resp.textFiles.routeFor,
    },
    videoFiles: {
      files: resp.videoFiles.files,
      routeFor: homePath + resp.videoFiles.routeFor,
    },
  };

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(createJson));
  }
}

export function readJson(pathToRead: string): Promise<jsonRe> {
  return new Promise((resolve, reject) => {
    try {
      fs.readFile(pathToRead, "utf-8", (err, data) => {
        if (err) {
          reject("error: " + err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
