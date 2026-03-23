import React from "react"
import { useNotifications } from '../../hooks/useNotification'
import { useMediaQuery } from "../../hooks/useMediaQuery"

const Navbar = ({ title, subTitle, btnText, onBtnClick }) => {
  const { unreadCount, markAllRead } = useNotifications()
  const { isMobile } = useMediaQuery()

  return (
    <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-6 py-4 w-full">

      <div className="flex items-center gap-3">
        {isMobile && <div className="w-8" />}
        <div>
          <h2 className="text-white text-sm font-semibold">{title}</h2>
          {!isMobile && <span className="text-zinc-500 text-xs">{subTitle}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3">

        {/* Bell Icon */}
        <div
          onClick={markAllRead}
          className="relative w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-all">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M7.5 1a4 4 0 0 1 4 4v2.5l1 2H2.5l1-2V5a4 4 0 0 1 4-4z" stroke="#a1a1aa" strokeWidth="1.2"/>
            <path d="M6 12a1.5 1.5 0 0 0 3 0" stroke="#a1a1aa" strokeWidth="1.2"/>
          </svg>
          {unreadCount > 0 && (
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-zinc-900 absolute -top-1 -right-1 flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">{unreadCount}</span>
            </div>
          )}
        </div>

        {/* Button */}
        {btnText && (
          <button
            onClick={onBtnClick}
            className="bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
            <span>+</span>
            {!isMobile && btnText}
          </button>
        )}

      </div>
    </div>
  )
}

export default Navbar