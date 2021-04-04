import { createContext, useReducer } from "react";
import update from "react-addons-update";

const trelloReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        trellos: {
          ...state.trellos,
          [action.parent]: [...state.trellos[action.parent], action.payload],
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
    case "UPDATE_ITEM_DEADLINE":
      const parent = action.parent;
      return {
        ...state,
        trellos: {
          ...state.trellos,
          [parent]: state.trellos[parent].map((todo, i) =>
            todo.id === action.payload
              ? { ...todo, deadline: action.deadline }
              : todo
          ),
        },
      };
    case "ADD_MEMBER":
      return {
        ...state,
        members: [...state.members, action.new],
      };

    case "REORDER_LIST":
      const copySource = state.trellos[action.parent][action.payload];
      const copyDest = state.trellos[action.parent][action.dest];

      return update(state, {
        trellos: {
          [action.parent]: {
            [action.dest]: { $set: copySource },
            [action.payload]: { $set: copyDest },
          },
        },
      });

    // 2 kopya al, birbirine set et.
    default:
      return state;
  }
};

const initialState = {
  name: "My Great Team",

  trellos: {
    Enhancements: [
      { id: 1, text: "xss attack prevention" },
      { id: 2, text: "Payee claim individual items" },
      {
        id: 3,
        text: "Item-breakdown in payor and payee summary view",
      },
      { id: 4, text: "Cute item icons" },
      {
        id: 5,
        text: "Payee can choose to pay by payor, not whole trip",
      },
    ],
    Progress: [
      {
        id: 623,
        text: "create a done",
        members: ["Eray G", "Fatih U.", "Tarık G."],
        deadline: "2021-04-01",
      },
      { id: 7, text: "my a done" },
    ],

    Done: [
      { id: 8, text: "connect itemization summary page" },
      { id: 9, text: "Deleting items from Itemized page" },
    ],
  },
  members: [
    {
      id: 10,
      name: "Monica Galler",
    },
    {
      id: 11,
      name: "Phoebe Buffay",
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
