import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import Avatar from "react-avatar";
import { DiTrello } from "react-icons/di";

function Header() {
  const myContext = useContext(trelloContext);
  return (
    <div className="container mx-auto h-auto bg-gray-100 mt-2 mb-8">
      <div className="flex items-center justify-center">
        <DiTrello className="fill-current text-green-700" size={28} />
        <h1 className="text-xl font-bold pt-2 text-green-700">Trello</h1>
      </div>

      <div>
        <div className="flex">
          <p className="py-4">Welcome </p>
          <p className="py-4 pl-1">{myContext.name}</p>
        </div>
        <div className="pt-3 pb-6">
          <p>Members</p>
          {myContext.members
            ? myContext.members.map((member) => (
                <Avatar
                  name={member.name}
                  size="30"
                  textSizeRatio={2.5}
                  round={true}
                ></Avatar>
              ))
            : null}
          <Avatar
            className="px-1"
            name="+Add"
            color="#065f46"
            size="25"
            textSizeRatio={2}
            round={true}
          ></Avatar>
        </div>
      </div>
    </div>
  );
}

export default Header;
