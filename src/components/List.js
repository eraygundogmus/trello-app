import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";

function List() {
  const myContext = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  // Note : You need to split this List into components later on.
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      {obj.map((trello, index) => (
        <div>
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
