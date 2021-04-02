import { createContext, useReducer } from "react";

const trelloReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        trellos: {
          ...state.trellos,
          todo: [...state.trellos.todo, action.payload],
        },
      };
    case "ADD_LIST":
      return {
        ...state,
        trellos: { ...state.trellos, [action.name]: [] },
      };
    case "DELETE_ITEM":
      const objKeys = Object.keys(state.trellos);
      const find = objKeys.filter((key) => key === action.parent);
      const name = action.parent;

      return {
        ...state,
        trellos: {
          ...state.trellos,
          [name]: state.trellos[name].filter((i) => i.id !== action.payload),
        },
      };
    case "UPDATE_ITEM_TITLE":
      const objKeys2 = Object.keys(state.trellos);
      const find2 = objKeys2.filter((key) => key === action.parent);
      const name2 = action.parent;
      return {
        ...state,
        trellos: {
          ...state.trellos,
          [name2]: state.trellos[name2].map((todo, i) =>
            todo.id === action.payload ? { ...todo, text: action.text } : todo
          ),
        },
      };
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
