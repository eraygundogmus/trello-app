import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";

function List() {
  const myContext = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  // Note : You need to split this List into components later on.
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {obj.map((trello, index) => (
        <div className="shadow-md rounded border border-gray-500 px-4">
          <h2 className="font-bold ">{trello}</h2>
          <div>
            {myContext.trellos[trello].map((item) => (
              <ListItem drill={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
