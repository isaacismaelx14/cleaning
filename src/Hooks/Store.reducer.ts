type action = {
  type: any;
};

const initialStore = {
  taskDoIt: [],
  path: "files.config.json",
};

const StoreReducer = (state, action: action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { initialStore };
export default StoreReducer;
