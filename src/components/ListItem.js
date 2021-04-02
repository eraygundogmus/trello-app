import React, { useState, useContext } from "react";
import { AiFillDelete } from "react-icons/ai"
import { trelloContext } from "../context/trelloContext";

function ListItem(props) {
  const [isTodoOpen, setisTodoOpen] = useState(false);
  const { dispatch } = useContext(trelloContext);

  const data = props.drill;


  const handleDeleteItem = () => {
    dispatch({
      type: "DELETE_ITEM",
      payload: props.drill.id,
      parent: props.trello
    })
  }

  // Note : Members, tags, checklist, deadline

  return (
    <div className="py-2">
      <p onClick={() => setisTodoOpen(true)}>{data.text} {data.deadline ? data.deadline : null}</p>
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
