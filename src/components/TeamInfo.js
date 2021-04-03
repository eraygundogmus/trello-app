import React, { useContext } from "react";
import { trelloContext } from "../context/trelloContext";
import Avatar from "react-avatar";

function TeamInfo() {
  const myContext = useContext(trelloContext);
  return (
    <div className="bg-gray-50 mx-2 px-4 ">
      <div className=" flex justify-center">
        <div className="flex mt-1 max-w-xs">
          <p className="py-2 text-gray-700 font-semibold px-12">
            {myContext.name}
          </p>
        </div>
      </div>
      <div>
        <p className="text-gray-500 font-semibold text-sm pb-2 pt-2 text-center">
          Members
        </p>
        <div className="justify-center flex">
          {myContext.members
            ? myContext.members.map((member) => (
                <Avatar
                  name={member.name}
                  className="cursor-pointer"
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
      <div className="mt-2 items-center">
        <p className="text-gray-500 text-sm pb-2 pt-2 font-semibold  text-center">
          Tags
        </p>
        <div className="justify-center flex">
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
