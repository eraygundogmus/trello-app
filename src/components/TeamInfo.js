import React, { useContext, useState } from "react";
import { trelloContext } from "../context/trelloContext";
import Avatar from "react-avatar";
import { v4 as uuidv4 } from "uuid";

function TeamInfo() {
  const myContext = useContext(trelloContext);
  const [userAddOpen, setuserAddOpen] = useState(false);
  const [newMemberName, setnewMemberName] = useState("");
  const { dispatch } = useContext(trelloContext);

  const userSubmit = (event) => {
    event.preventDefault();
    const newMember = {
      id: uuidv4(),
      name: newMemberName,
    };
    dispatch({
      type: "ADD_MEMBER",
      new: newMember,
    });
    setuserAddOpen(false);
  };
  return (
    <div className="bg-gray-50 mx-2 px-4 flex p-4 mb-4">
      <div className="items-center flex mr-4">
        <p className="text-sm font-medium  text-gray-900 ">{myContext.name}</p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-500 font-semibold text-sm pb-2 pt-2">Members</p>
        <div className="flex ml-2 relative">
          {myContext.members
            ? myContext.members.map((member) => (
                <Avatar
                  name={member.name}
                  className="cursor-pointer "
                  size="30"
                  textSizeRatio={2.5}
                  round={true}
                ></Avatar>
              ))
            : null}
          <Avatar
            className="px-1 cursor-pointer"
            name="+Add"
            color="#065f46"
            size="25"
            textSizeRatio={2}
            round={true}
            onClick={() => setuserAddOpen(true)}
          ></Avatar>
          {userAddOpen ? (
            <div className="absolute z-10">
              <form
                className="w-full justify-between flex"
                onSubmit={userSubmit}
              >
                <input
                  type="text"
                  required="required"
                  placeholder="enter name"
                  onChange={(event) => setnewMemberName(event.target.value)}
                  value={newMemberName}
                  className="px-2 pr-2  rounded-xl text-xs focus:outline-none focus:ring-1 ring-green-700 focus:border-green-500"
                ></input>
                <button type="submit" className="main">
                  Add Member
                </button>
              </form>
              <button onClick={() => setuserAddOpen(false)} className="main">
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div className="items-center flex ml-12">
        <p className="text-gray-500 font-semibold text-sm pb-2 pt-2">Tags</p>
        <div className="flex ml-2">
          {myContext.tags.map((tag) => (
            <div
              style={{ backgroundColor: tag.color }}
              className="border rounded-md "
            >
              <p className="text-gray-50 font-semibold text-xs px-4 py-1">
                {tag.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamInfo;
