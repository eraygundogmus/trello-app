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
      const name = action.parent;
      return {
        ...state,
        trellos: {
          ...state.trellos,
          [name]: state.trellos[name].filter((i) => i.id !== action.payload),
        },
      };
    case "UPDATE_ITEM_TITLE":
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
  name: "My Great Team",

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

    Done: [
      { id: 554252561, text: "connect itemization summary page" },
      { id: 135232313, text: "Deleting items from Itemized page" },
    ],
  },
  members: [
    {
      id: 13036334,
      name: "Monica Galler",
    },
    {
      id: 13036324242534,
      name: "Phoebe Buffay",
    },
    {
      id: 1303632362362372434,
      name: "Ross Galler",
    },
    {
      id: 130368569569656334,
      name: "Rachel Green",
    },
  ],
  tags: [
    { name: "frontend", color: "#30838C" },
    { name: "backend", color: "#F2CB05" },
    { name: "system", color: "#F2D5CE" },
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
        members: state.members,
        tags: state.tags,
        dispatch,
      }}
    >
      {props.children}
    </trelloContext.Provider>
  );
};
