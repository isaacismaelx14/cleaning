import React, { useEffect, useState } from "react";
import StoreProvider from "../Hooks/Store.provider";
import Home from "../components/homePage/Home";
import { ipcRenderer } from "electron";
import Setup from "./Setup";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    ipcRenderer.on("open:settings", (e, newData) => {
      setData(JSON.parse(newData));
    });
  }, []);

  useEffect(() => {
    if (data !== undefined) setShowSettings(true);
  }, [data]);

  useEffect(() => {
    if (!showSettings) setData(undefined);
  }, [showSettings]);

  return (
    <div>
      <StoreProvider>
        {showSettings ? (
          <Setup data={data} changeState={setShowSettings} />
        ) : (
          <Home />
        )}
      </StoreProvider>
    </div>
  );
}
export default App;
