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
  trellos: [
    {
      todos: [
        {
          id: 1,
          task: "enter your todo",
          time: undefined,
          deadline: undefined,
          members: undefined,
        },
        {
          id: 2,
          task: "second todo",
          time: undefined,
          deadline: undefined,
          members: undefined,
        },
      ],
    },
    { doing: [] },
  ],
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
