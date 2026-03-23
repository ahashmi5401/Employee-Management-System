import React from "react";

const Input = ({ placeholder, search, setSearch, value, onChange }) => {
  return (
    <input
      type="text"
      value={value !== undefined ? value : search}
      onChange={onChange !== undefined ? onChange : (e) => setSearch(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-zinc-900 py-2.5 md:py-3 px-3 md:px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600 w-full"
    />
  )
}

export default Input