import React, { useState, useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { trelloContext } from "../context/trelloContext";

// Note : Members, tags, checklist, deadline

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
    <div className="py-2">
      {isEditOpen ? (
        <div>
          <p onClick={() => setisTodoOpen(true)}>
            {data.text} {data.deadline ? data.deadline : null}
          </p>
          <AiFillEdit onClick={(event) => setisEditOpen(false)} />
        </div>
      ) : (
        <div>
          <form onSubmit={handleEditForm}>
            <input
              type="text"
              placeholder="something"
              onChange={(event) => setEditText(event.target.value)}
              value={editText}
            ></input>
            <button className="main">Save</button>
          </form>
          <button onClick={(event) => setisEditOpen(true)}>Close</button>
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
