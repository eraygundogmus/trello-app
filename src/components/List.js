import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import Card from "./Card";

function List() {
  const myContext = useContext(trelloContext);
  return (
    <>
      {myContext.trellos.map((trello) => (
        <Card name={Object.getOwnPropertyNames(trello)} />
      ))}
    </>
  );
}

export default List;
