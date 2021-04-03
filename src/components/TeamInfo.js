import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import Avatar from "react-avatar";

function TeamInfo() {
  const myContext = useContext(trelloContext);
  return (
    <div className="bg-gray-50 mx-2 px-4 flex p-4 mb-4">
      <div className="items-center flex mr-4">
        <p className="text-sm font-medium  text-gray-900 ">{myContext.name}</p>
      </div>
      <div className="flex items-center">
        <p className="text-gray-500 font-semibold text-sm pb-2 pt-2">Members</p>
        <div className="flex ml-2">
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
          ></Avatar>
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
