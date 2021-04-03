import React, { useState, useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { trelloContext } from "../context/trelloContext";
import { MdDateRange } from "react-icons/md";

// Note : Members, tags, checklist, deadline
// Don't forget to add focus on text input
// todos:
// 1 : add details on popups, add members,tags etc. in a todo details (update initialState well-matched for this)
// 2 : style everything
// 3 : add other reducers =>
// add - remove tag
// add- change- update deadline
// add - change - update members
// 4 : check out for bugs
// 5 : add drag&drop

// extras:
// 1: login- auth,
// 2: checklist

function ListItem(props) {
  const [isTodoOpen, setisTodoOpen] = useState(false);
  const { dispatch } = useContext(trelloContext);
  const [isEditOpen, setisEditOpen] = useState(true);
  const [editText, setEditText] = useState("");

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

  return (
    <div className=" max-w-full items-center ">
      {isEditOpen ? (
        <div className="bg-white flex rounded-xl  border border-gray-300 shadow my-1 relative">
          <div className="relative max-w-full">
            <p
              className=" p-2 font-normal  text-left text-gray-700  break-words max-w-full	"
              onClick={() => setisTodoOpen(true)}
            >
              {data.text}
            </p>
            {data.deadline ? (
              <div className="mx-2 mb-2 flex">
                <MdDateRange className="fill-current text-green-700" />
                <h4 className="px-1 text-left text-sm text-gray-600 break-words ">
                  {data.deadline}
                </h4>
              </div>
            ) : null}
          </div>
          <div className="absolute top-3 right-2">
            <AiFillEdit
              className="fill-current text-green-700"
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
              className="px-2 pr-2 rounded-xl w-full  h-full focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
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
        <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-40 shadow-xl">
          <p>{data.text}</p>
          <AiFillDelete onClick={handleDeleteItem} />
          {data.members
            ? data.members.map((member) => <div>{member}</div>)
            : null}
          <button onClick={() => setisTodoOpen(false)}>X</button>
        </div>
      ) : null}
    </div>
  );
}

export default ListItem;
