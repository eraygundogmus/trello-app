import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import ListItem from "./ListItem";

function List() {
  const myContext = useContext(trelloContext);
  const obj = Object.keys(myContext.trellos);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {obj.map((trello, index) => (
        <div className="shadow-md rounded border border-gray-500 px-4">
          <h2 className="font-bold ">{trello}</h2>
          <div>
            {myContext.trellos[trello].map((item) => (
              <ListItem drill={item} />
            ))}
            <button className="rounded-2xl bg-red-500 w-8">+</button>
            {/*             <div>
              Modal
              <form>
                <input placeholder="what is todo?"></input>
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  value="2018-07-22"
                  min="2021-01-01"
                  max="2022-12-31"
                ></input>
                <select name="cars" id="cars">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </form>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
