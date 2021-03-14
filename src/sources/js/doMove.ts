import OrganizeFiles from "../../backend/organizeFiles";

const organizeFiles = new OrganizeFiles();
let response: IFinalResut;
let messageRespose: any[] = [];

export async function executeMove(array = []) {

  messageRespose = [];
  await destrucTure(array, (path) => start(path));
  return response;
}

async function destrucTure(array, callBack) {
  for (let i = 0; i < array.length; ++i) {
    await callBack(array[i].item + "\\");
  }
}

async function start(path) {
  await organizeFiles
    .start(path)
    .then(async (res) => {
      response = await mixArray(res);
    })
    .catch((res) => {
      response = res;
    });
}

async function mixArray(obj: IFinalResut): Promise<IFinalResut> {
  console.log("Ejecutando");
  obj.message.forEach((element) => {
    messageRespose.push(element);
  });
  return {
    messageType: obj.messageType,
    message: messageRespose,
  };
}

}
