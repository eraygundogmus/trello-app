import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import Card from "./Card";

function List() {
  const myContext = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);
  return (
    <div className="grid grid-cols-1 md:grid-cols-6">
      {obj.map((trello, index) => (
        <div>{myContext.trellos[trello].map((item) => item.text)}</div>
      ))}
    </div>
  );
}

export default List;
