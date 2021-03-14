import React from "react";
import StoreProvider from "../Hooks/Store.provider";
import Home from "./homePage/Home";

function App() {
  return (
    <div>
      <StoreProvider>
        <Home />
      </StoreProvider>
    </div>
  );
}
export default App;
