import React, { useState } from "react";
import Renderer from "electron";
import { executeMove } from "../sources/js/doMove";
import List from "../components/List";
import ButtonSm from "../addons/buttons";
import StateApp from "../components/StateApp";

type TypeAppState = typeof initAppState;
const initAppState: IAppState = "none";

function App() {
  const [list, setList] = useState([
    {
      id: "C:\\Users\\isaac\\Desktop\\Test",
      item: "C:\\Users\\isaac\\Desktop\\Test",
    },
  ]);
  const [appState, setAppState] = useState<TypeAppState>(initAppState);
  const [fileToMove, setFileToMove] = useState(undefined);

  const sendCall = (e) => {
    setAppState("none");
    Renderer.ipcRenderer.send("select:folder");
    e.preventDefault();
  };

  const handleAddItem = (task) => {
    enterIntoArray(task, () => {
      const newItem = {
        id: task,
        item: task,
      };
      setList([...list, newItem]);
    });
  };

  const handleDeleteItem = (e, itemId) => {
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
    e.preventDefault();
  };

  const enterIntoArray = (task, callBack) => {
    const checkIfExist = () => list.filter((item) => item.item === task);

    if (checkIfExist().length === 0) {
      callBack();
    }
  };

  const handleClickOrder = async (e) => {
    setAppState("doing");
    const resp = await executeMove(list);
    if (resp.messageType) {
      setFileToMove(resp.message);
      setAppState(resp.messageType);
    }
    e.preventDefault();
  };

  Renderer.ipcRenderer.on("selected:folder", (e, selected) => {
    if (selected) {
      handleAddItem(selected[0]);
    }
  });

  return (
    <div>
      <div className="container p-4">
        <div className="row">
          <div className="col">
            <List list={list} func={handleDeleteItem} />
            <ButtonSm onClick={sendCall}>Add Folder</ButtonSm>
            <ButtonSm onClick={handleClickOrder}>Order Now</ButtonSm>
            <StateApp state={appState} file={fileToMove} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
