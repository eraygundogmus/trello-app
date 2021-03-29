import { createContext, useReducer } from "react";

const trelloReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  name: "user",
  trellos: {
    todos: {},
    doing: {},
    done: {},
  },
};

export const trelloContext = createContext();

export const TrelloProvider = (props) => {
  const [state, dispatch] = useReducer(trelloReducer, initialState);

  return (
    <trelloContext.Provider
      value={{
        name: state.name,
        trellos: state.trellos,
        dispatch,
      }}
    >
      {props.children}
    </trelloContext.Provider>
  );
};
