import React, { useContext, useState } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";

function List() {
  const myContext = useContext(trelloContext);
  const { dispatch } = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  const [isTodoFormOpen, setisTodoFormOpen] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState();
  const [todoParent, setTodoParent] = useState();

  console.log(myContext);
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
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {obj.map((trello, index) => (
        <div className="shadow-md rounded border border-gray-500 px-4">
          <h2 className="font-bold ">{trello}</h2>
          <div>
            {myContext.trellos[trello].map((item) => (
              <ListItem drill={item} />
            ))}
            <button
              onClick={() => setisTodoFormOpen(true)}
              className="rounded-2xl bg-red-500 w-8"
            >
              +
            </button>
            {isTodoFormOpen ? (
              <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-40 shadow-xl">
                Modal
                <form onSubmit={onSubmit}>
                  <input
                    value={todoText}
                    required="required"
                    onChange={(event) => setTodoText(event.target.value)}
                    placeholder="what is todo?"
                  ></input>

                  <input
                    type="date"
                    id="start"
                    name="trip-start"
                    value={todoDate}
                    min="2021-01-01"
                    max="2022-12-31"
                    onChange={(event) => setTodoDate(event.target.value)}
                  ></input>
                  <button type="submit  "> Submit</button>
                  <button onClick={() => setisTodoFormOpen(false)}> X </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
