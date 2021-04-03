import React from "react";
import { DiTrello } from "react-icons/di";

function Header() {
  return (
    <div className="container mx-auto h-auto bg-white mt-2 mb-8">
      <div className="flex items-center mt-4 justify-center">
        <DiTrello className="fill-current text-green-700" size={28} />
        <h1 className="text-xl font-bold pt-2 text-green-700">Trello</h1>
      </div>
    </div>
  );
}

export default Header;
