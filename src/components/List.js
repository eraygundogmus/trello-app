import React, { useContext, useState } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import { MdMoreHoriz } from "react-icons/md";
import TeamInfo from "./TeamInfo";

function List() {
  const myContext = useContext(trelloContext);
  const { dispatch } = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  const [isTodoFormOpen, setisTodoFormOpen] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState();
  const [isNewListOpen, setisNewListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuidv4(),
      text: todoText,
      members: undefined,
      deadline: todoDate,
    };
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    setisTodoFormOpen(false);
  };

  const newCardSubmit = (event) => {
    event.preventDefault();
    const name = newListName;
    const newList = [];
    dispatch({
      type: "ADD_LIST",
      payload: newList,
      name: name,
    });
  };

  return (
    <div className="myGrid">
      <TeamInfo />
      {obj.map((trello, index) => (
        <div className="myList">
          <div className="flex justify-between items-center	">
            <h2 className="font-semibold py-2">{trello}</h2>
            <MdMoreHoriz />
          </div>
          <div>
            {myContext.trellos[trello].map((item) => (
              <ListItem trello={trello} drill={item} />
            ))}
            {/*             <div className="single">
              <div className="single-open">
                <p className="text">Add new</p>
              </div>
            </div> */}
            {isTodoFormOpen ? (
              <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-30 shadow-xl">
                <div className="bg-white rounded-xl items-center m-64 flex">
                  <form
                    className="justify-center flex w-full h-full"
                    onSubmit={onSubmit}
                  >
                    <input
                      value={todoText}
                      required="required"
                      onChange={(event) => setTodoText(event.target.value)}
                      placeholder="Enter a title for card"
                      className="px-2  w-full pr-2 rounded-xl  text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                    ></input>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      value={todoDate}
                      min="2021-01-01"
                      max="2022-12-31"
                      className="w-full rounded-xl  text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                      onChange={(event) => setTodoDate(event.target.value)}
                    ></input>
                    <button className="main" type="submit">
                      Submit
                    </button>
                    <button
                      className="main"
                      onClick={() => setisTodoFormOpen(false)}
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button onClick={() => setisTodoFormOpen(true)} className="main m-2">
          Create card
        </button>
        <button className="main m-2" onClick={() => setisNewListOpen(true)}>
          Create list
        </button>
      </div>
      {isNewListOpen ? (
        <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-30 shadow-xl">
          <div className="bg-white rounded-xl items-center m-64 flex">
            <form
              className="w-full justify-between flex h-full"
              onSubmit={newCardSubmit}
            >
              <input
                value={newListName}
                onChange={(event) => setNewListName(event.target.value)}
                placeholder="Enter list name"
                className="px-2 pr-2 rounded-xl w-full text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
              ></input>
              <button className="main"> Add</button>
            </form>
            <button className="main" onClick={() => setisNewListOpen(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default List;
