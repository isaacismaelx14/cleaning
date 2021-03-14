import { createContext, useReducer } from "react";
import StoreReducer, { initialStore } from "./Store.reducer";

const StoreContext = createContext();

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(StoreReducer, initialStore);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreProvider;
