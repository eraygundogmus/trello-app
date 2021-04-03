import { createContext, useReducer } from "react";

const trelloReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        trellos: {
          ...state.trellos,
          Enhancements: [...state.trellos.Enhancements, action.payload],
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
    Enhancements: [
      { id: 1, text: "xss attack prevention" },
      { id: 13513, text: "Payee claim individual items" },
      {
        id: 35234523523,
        text: "Item-breakdown in payor and payee summary view",
      },
      { id: 7657567567, text: "Cute item icons" },
      {
        id: 2323623632,
        text: "Payee can choose to pay by payor, not whole trip",
      },
      {
        id: "1241204asdfmdgm235",
        text: "Payee can choose to pay by payor, not whole trip",
        definition: "Google, facebook, braintree vemmo",
      },
    ],
    Progress: [
      {
        id: 2,
        text: "create a done",
        members: ["Eray G", "Fatih U.", "Tarık G."],
        deadline: "2021-04-01",
      },
      { id: 3, text: "my a done" },
    ],
  },
  members: {
    name: "Me",
  },
  tags: [
    { name: "frontend", color: "blue" },
    { name: "backend", color: "green" },
    { name: "system", color: "red" },
  ],
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
