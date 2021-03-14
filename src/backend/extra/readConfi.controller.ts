import { readJson } from "./config.controller";

let jsonResponse: jsonRe;

export function redingJson(path: string) {
  readJson(path)
    .then((res) => {
      //   console.log(res);
      jsonResponse = res;
    })
    .catch((error) => {
      console.error(error);
    });
}

export { jsonResponse };
