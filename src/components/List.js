import React, { useContext, useState } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import { MdMoreHoriz } from "react-icons/md";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function List() {
  const myContext = useContext(trelloContext);
  const { dispatch } = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  const [isTodoFormOpen, setisTodoFormOpen] = useState(false);
  const [todoText, setTodoText] = useState("");
  const [todoDate, setTodoDate] = useState();
  const [isNewListOpen, setisNewListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [parentName, setParentName] = useState(obj[0]);

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
      parent: parentName,
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
    setisNewListOpen(false);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      // if destination is null
      return;
    }

    if (source.droppableId == destination.droppableId) {
      obj.map((trello, index) => {
        if (index == source.droppableId) {
          let parentName2 = trello;
          let sourceList = myContext.trellos[parentName2];
          let dragginItem = sourceList.filter((i) => i.id == draggableId)[0];
          sourceList.splice(source.index, 1);
          sourceList.splice(destination.index, 0, dragginItem);
          /*           dispatch({
            type: "REORDER_LIST",
            payload: source.index,
            dest: destination.index,
            parent: parentName2,
          }); */
        }
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="myGrid">
        {obj.map((trello, index) => (
          <Droppable droppableId={index} name={trello}>
            {(provided) => (
              <div
                className="myList"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="flex justify-between items-center	">
                  <h2 className="font-semibold py-2">{trello}</h2>
                  <MdMoreHoriz />
                </div>
                {myContext.trellos[trello].map((item, i) => (
                  <ListItem i={i} trello={trello} drill={item} />
                ))}
                {isTodoFormOpen ? (
                  <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-30 shadow-xl">
                    <div className="bg-white rounded-xl items-center mx-24 my-64 flex">
                      <form
                        className="justify-center flex w-full h-full"
                        onSubmit={onSubmit}
                      >
                        <input
                          value={todoText}
                          required="required"
                          onChange={(event) => setTodoText(event.target.value)}
                          placeholder="Enter a title for card"
                          className="px-6  w-full  min-w-min pr-2  rounded-xl  text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                        ></input>
                        <input
                          type="date"
                          id="start"
                          name="trip-start"
                          value={todoDate}
                          min="2021-01-01"
                          max="2022-12-31"
                          className="px-6 w-full rounded-xl min-w-min text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                          onChange={(event) => setTodoDate(event.target.value)}
                        ></input>
                        <select
                          onChange={(event) =>
                            setParentName(event.target.value)
                          }
                          value={parentName}
                          name="parent"
                          id="parent"
                          required="required"
                        >
                          <option disabled selected>
                            Select a list
                          </option>
                          {obj.map((trello) => (
                            <option>{trello}</option>
                          ))}
                        </select>
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
            )}
          </Droppable>
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
            <div className="bg-white rounded-xl items-center  mx-24 my-64 flex">
              <form
                className="w-full justify-between flex h-full"
                onSubmit={newCardSubmit}
              >
                <input
                  value={newListName}
                  onChange={(event) => setNewListName(event.target.value)}
                  placeholder="Enter list name"
                  className="px-6 pr-2 rounded-xl w-full text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
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
    </DragDropContext>
  );
}

export default List;
