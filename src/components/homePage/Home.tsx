import React, { useState, useContext, useEffect } from "react";
import Renderer from "electron";
import { executeMove, createJson } from "../../sources/js/doMove";
import List from "../List";
import ButtonSm from "../../addons/buttons";
import StateApp from "../StateApp";
import { StoreContext } from "../../Hooks/Store.provider";
import Setup from "../../views/Setup";
import configController from "../../backend/extra/config.controller";

const initAppState: IAppState = "none";
const initList = [
  {
    id: "C:\\Users\\isaac\\Desktop\\Test",
    path: "C:\\Users\\isaac\\Desktop\\Test",
  },
];

export default function Home(props: {
  showSettings: any;
  setShowSettings: any;
  data: any;
}) {
  const [item, setItem] = useState();
  const [appState, setAppState] = useState(initAppState);
  const [fileToMove, setFileToMove] = useState(undefined);
  const [store, dispatch] = useContext(StoreContext);
  const [toDo, setToDo] = useState([]);
  const isToDo = toDo.length > 0;
  const sendCall = (e) => {
    setAppState("none");
    Renderer.ipcRenderer.send("select:folder");
    e.preventDefault();
  };

  const handleSeeTemplate = () => {
    Renderer.ipcRenderer.send("lauch:settings");
  };

  const handleAddItem = (task) => {
    setItem({
      id: Date.now(),
      path: task,
    });
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

  useEffect(() => {
    if (item) {
      const check: any[] = toDo.filter(
        (itemList) => itemList.path === item.path
      );
      if (check.length === 0) {
        setToDo([...toDo, item]);
      }
    }
    return () => {
      setItem(undefined);
    };
  }, [item]);

  useEffect(() => {
    configController("toDo.json", { toDo: toDo }, false);
  }, [toDo]);

  const showHomePage = () => (
    <div className="container p-4">
      <div className="row">
        <div className="col">
          {appState != "none" ? (
            <StateApp
              state={appState}
              file={fileToMove}
              setState={setAppState}
            />
          ) : (
            <div>
              {!isToDo && (
                <div>
                  <h2>Empieza a ordernar tus archivos</h2>
                  <p>
                    Pulsa <span>Añadir folder</span> para empezar
                  </p>
                </div>
              )}
              <ButtonSm color="primary" onClick={() => handleSeeTemplate()}>
                Ver templates
              </ButtonSm>
              {isToDo && <List list={toDo} func={handleDeleteItem} />}
              <ButtonSm onClick={sendCall}>Añadir folder</ButtonSm>
              {isToDo && (
                <ButtonSm onClick={handleClickOrder}>Ordernar</ButtonSm>
              )}
            </div>
          )}

          <div className="mt-2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {props.showSettings ? (
        <Setup data={props.data} changeState={props.setShowSettings} />
      ) : (
        <div>{showHomePage()}</div>
      )}
    </div>
  );
}
