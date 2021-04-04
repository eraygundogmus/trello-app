import React, { useState, useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { trelloContext } from "../context/trelloContext";
import { MdDateRange } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

function ListItem(props) {
  const [isTodoOpen, setisTodoOpen] = useState(false);
  const { dispatch } = useContext(trelloContext);
  const [isEditOpen, setisEditOpen] = useState(true);
  const [editText, setEditText] = useState("");
  const [upDate, setupDate] = useState();

  const data = props.drill;
  const handleEditForm = (event) => {
    event.preventDefault();
    dispatch({
      type: "UPDATE_ITEM_TITLE",
      payload: props.drill.id,
      parent: props.trello,
      text: editText,
    });
    setisEditOpen(true);
  };

  const handleDeleteItem = () => {
    dispatch({
      type: "DELETE_ITEM",
      payload: props.drill.id,
      parent: props.trello,
    });
    setisTodoOpen(false);
  };

  const upDateForm = (event) => {
    event.preventDefault();
    dispatch({
      type: "UPDATE_ITEM_DEADLINE",
      payload: props.drill.id,
      parent: props.trello,
      deadline: upDate,
    });
    setisTodoOpen(false);
  };

  return (
    <Draggable
      draggableId={`draggable${data.id}`}
      key={data.id}
      index={props.i}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="single"
        >
          {isEditOpen ? (
            <div className="single-open">
              <div className="relative max-w-full">
                <p className="text" onClick={() => setisTodoOpen(true)}>
                  {data.text}
                </p>
                {data.deadline ? (
                  <div className="mx-2 mb-2 flex">
                    <MdDateRange className="fill-current text-green-700" />
                    <h4 className="px-1 text-left text-xs text-gray-600 break-words ">
                      {data.deadline}
                    </h4>
                  </div>
                ) : null}
              </div>
              <div className="absolute top-3 right-2">
                <AiFillEdit
                  className="fill-current cursor-pointer text-green-700"
                  onClick={(event) => setisEditOpen(false)}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white flex rounded-xl  border border-gray-300 shadow my-1 relative ">
              <form
                className="w-full justify-between flex"
                onSubmit={handleEditForm}
              >
                <input
                  type="text"
                  required="required"
                  placeholder={data.text}
                  onChange={(event) => setEditText(event.target.value)}
                  value={editText}
                  className="px-2 pr-2  rounded-xl w-full text-xs h-full focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                ></input>
                <button type="submit" className="main">
                  Save
                </button>
              </form>

              <button className="px-3" onClick={(event) => setisEditOpen(true)}>
                X
              </button>
            </div>
          )}

          {isTodoOpen ? (
            <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-30 shadow-xl">
              <div className="bg-white items-center m-64">
                <div className="relative">
                  <p className="text-center text-gray-700  font-semibold py-2">
                    {data.text}
                  </p>
                  <p className="text-center text-gray-700  text-sm font-light">
                    In the list: {props.trello}
                  </p>
                  <form
                    className="justify-center flex w-full h-full"
                    onSubmit={upDateForm}
                  >
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      required="required"
                      value={upDate}
                      min="2021-01-01"
                      max="2022-12-31"
                      className="px-6 w-full rounded-xl min-w-min text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                      onChange={(event) => setupDate(event.target.value)}
                    ></input>
                    <button type="submit" className="main">
                      Update
                    </button>
                  </form>
                  <AiFillDelete onClick={handleDeleteItem} />
                  {data.members ? (
                    <div className="px-4 font-bold text-sm text-gray-700">
                      Members
                      {data.members
                        ? data.members.map((member) => (
                            <p className="text-gray-700 text-sm  font-normal">
                              {member}
                            </p>
                          ))
                        : null}
                    </div>
                  ) : null}

                  <button
                    className="absolute top-2 right-3 font-semibold	"
                    onClick={() => setisTodoOpen(false)}
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Draggable>
  );
}

export default ListItem;
