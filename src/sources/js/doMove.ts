import OrganizeFiles from "../../backend/organizeFiles";

const organizeFiles = new OrganizeFiles();
let response: IFinalResut;

export async function executeMove(array = []) {
  await destrucTure(array, (path) => start(path));
  return response;
}

async function destrucTure(array, callBack) {
  for (let i = 0; i < array.length; ++i) {
    await callBack(array[i].item + "\\");
  }
}

async function start(path) {
  response = await organizeFiles.start(path);
}
