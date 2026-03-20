import React from "react";

const Input = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="flex-1 bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600"
    />
  );
};

export default Input;
