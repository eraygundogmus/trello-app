import React, { useContext, useState, useEffect } from "react";
import { trelloContext } from "../context/trelloContext";

function Card(props) {
  const myContext = useContext(trelloContext);

  const [name, setName] = useState();

  useEffect(() => {
    const cardName = props.name;
    setName(cardName);
  }, []);

  const index = props.index;
  const card = myContext.trellos[index];

  return (
    <div className="box-border p-4 border-4">
      <p>{props.name[0]}</p>
      <div> {}</div>
    </div>
  );
}

export default Card;
