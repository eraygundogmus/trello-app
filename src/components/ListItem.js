import React, { useState, useEffect } from "react";

function ListItem(props) {
  const [isOpen, setisOpen] = useState(false);
  const data = props.drill;

  // Note : Members, tags, checklist, deadline

  return (
    <div>
      <p onClick={() => setisOpen(true)}>{data.text}</p>
      {isOpen ? (
        <div className="z-10 bg-gray-500 border border-gray-500 absolute w-full h-full inset-0 bg-opacity-40 shadow-xl">
          <p>{data.text}</p>
          {data.members
            ? data.members.map((member) => <div>{member}</div>)
            : null}
          <button onClick={() => setisOpen(false)}>X</button>
        </div>
      ) : null}
      <button>Click</button>
    </div>
  );
}

export default ListItem;
