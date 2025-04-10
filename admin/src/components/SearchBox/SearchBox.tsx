import React from "react";
import { VscSearch } from "react-icons/vsc";

const SearchBox: React.FC = () => {
  return (
    <div className="relative flex items-center">
      <VscSearch className="text-gray-600 mr-2" />
      <input
        type="text"
        placeholder="Search here..."
        className="p-2 pl-10 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBox;
