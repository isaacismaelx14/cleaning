import React, { useState, useContext, useEffect } from "react";
import Renderer from "electron";
import { executeMove, createJson } from "../../sources/js/doMove";
import List from "../List";
import ButtonSm from "../../addons/buttons";
import StateApp from "../StateApp";
import { StoreContext } from "../../Hooks/Store.provider";

const initAppState: IAppState = "none";
const initList = [
  {
    id: "C:\\Users\\isaac\\Desktop\\Test",
    path: "C:\\Users\\isaac\\Desktop\\Test",
  },
];

export default function Home() {
  const [item, setItem] = useState();
  const [appState, setAppState] = useState(initAppState);
  const [fileToMove, setFileToMove] = useState(undefined);
  const [store, dispatch] = useContext(StoreContext);

  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    if (item) {
      const check: any[] = toDo.filter(
        (itemList) => itemList.path === item.path
      );
      if (check.length === 0) {
        setToDo([...toDo, item]);
      }
    }
  }, [item]);

  useEffect(() => {
    console.log(toDo);
  }, [toDo]);

  const sendCall = (e) => {
    setAppState("none");
    Renderer.ipcRenderer.send("select:folder");
    e.preventDefault();
  };

  const handleAddItem = (task) => {
    setItem({
      id: Date.now(),
      path: task,
    });
    console.log("clicked");
  };

  const handleDeleteItem = (e, itemId) => {
    const newList = toDo.filter((item) => item.id !== itemId);
    setToDo(newList);
    e.preventDefault();
  };

  const handleClickOrder = async (e) => {
    setAppState("doing");
    const resp = await executeMove(toDo);
    console.log(resp);

    if (resp.messageType) {
      setFileToMove(resp.message);
      setAppState(resp.messageType);
    }
    e.preventDefault();
  };

  useEffect(() => {
    createJson(store.path);

    Renderer.ipcRenderer.on("selected:folder", (e, selected) => {
      if (selected) {
        handleAddItem(selected[0]);
      }
    });
  }, []);

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col">
          {toDo.length > 0 && <List list={toDo} func={handleDeleteItem} />}

          <ButtonSm onClick={sendCall}>Añadir folder</ButtonSm>
          <ButtonSm onClick={handleClickOrder}>Ordernar</ButtonSm>
          <StateApp state={appState} file={fileToMove} />
          <div className="mt-2">
            <ButtonSm color="primary">Ver templates</ButtonSm>
          </div>
        </div>
      </div>
    </div>
  );
}
