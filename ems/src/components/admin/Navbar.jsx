import React from "react"

const Navbar = ({ title, subTitle, btnText, onBtnClick }) => {
  return (
    <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-6 py-4">
      <div>
        <h2 className="text-white text-sm font-semibold">{title}</h2>
        <span className="text-zinc-500 text-xs">{subTitle}</span>
      </div>

      {btnText && (
        <button
          onClick={onBtnClick}
          className="bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span>+</span>
          {btnText}
        </button>
      )}
    </div>
  )
}

export default Navbar