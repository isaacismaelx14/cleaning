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

let jsonResponse: jsonRe;

export function redingJson() {
  return fetch(__dirname + "\\json\\files.config.json")
    .then((resp) => resp.json())
    .then((res) => (jsonResponse = res))
    .catch((e) => console.error(e));
}

export { jsonResponse };
