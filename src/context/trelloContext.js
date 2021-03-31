import { createContext, useReducer } from "react";

const trelloReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {
  name: "Eray Gundogmus",
  teamName: "Programmers",
  trellos: {
    todo: [{ id: 1, text: "create a todo" }],
    done: [
      { id: 2, text: "create a done" },
      { id: 3, text: "my a done" },
      { id: 4, text: "my second a done" },
      { id: 5, text: "my third a done" },
      { id: 6, text: "my fourth a done" },
    ],
  },
  members: {
    name: "Me",
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
