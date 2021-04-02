import React, { useState, useContext } from "react";

function ListItem(props) {
  const [isTodoOpen, setisTodoOpen] = useState(false);

  const data = props.drill;

  // Note : Members, tags, checklist, deadline

  return (
    <div className="py-2">
      <p onClick={() => setisTodoOpen(true)}>{data.text} {data.deadline ? data.deadline : null}</p>
      {isTodoOpen ? (
        <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-40 shadow-xl">
          <p>{data.text}</p>
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
