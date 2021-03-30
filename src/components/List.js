import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";

function List() {
  const myContext = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      {obj.map((trello, index) => (
        <div>
          <h2 className="font-normal ">{trello}</h2>
          <ul>
            {myContext.trellos[trello].map((item) => (
              <li>{item.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default List;
