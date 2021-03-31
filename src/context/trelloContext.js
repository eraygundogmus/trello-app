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
      {
        id: 2,
        text: "create a done",
        members: ["Eray G", "Fatih U.", "Tarık G."],
        deadline: "22.02.2222",
        tags: ["fast", "frontend", "ui"],
      },
      { id: 3, text: "my a done" },
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
