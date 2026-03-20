import React from "react";

const Navbar = ({ title, subTitle, btnText = "Add Employee" }) => {
  return (
    <div className="flex justify-between items-center bg-zinc-900 border-b  border-zinc-800 px-6 py-4 w-full">
      <div>
        <h2 className="text-white text-sm font-semibold">{title}</h2>
        <span className="text-zinc-500 text-xs">{subTitle}</span>
      </div>

      <div className="relative w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-all">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M7.5 1a4 4 0 0 1 4 4v2.5l1 2H2.5l1-2V5a4 4 0 0 1 4-4z"
            stroke="#a1a1aa"
            strokeWidth="1.2"
          />
          <path
            d="M6 12a1.5 1.5 0 0 0 3 0"
            stroke="#a1a1aa"
            strokeWidth="1.2"
          />
        </svg>
        <div className="w-2 h-2 rounded-full bg-red-500 border-2 border-zinc-900 absolute top-1 right-1"></div>
      </div>
    </div>
  );
};
export default Navbar;
