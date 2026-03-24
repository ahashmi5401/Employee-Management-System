import React from "react"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { getNavbarIcon } from "../../data/admin/navIcon"

const Navbar = ({ title, subTitle, btnText, icon ,onBtnClick }) => {
  const { isMobile } = useMediaQuery()

  return (
    <div className="flex justify-between items-center bg-zinc-900 border-b border-zinc-800 px-6 py-4">

      <div className="flex items-center gap-3">
        {isMobile && <div className="w-8" />}  {/* ← ? ki jagah && */}
        <div>
          <h2 className="text-white text-sm font-semibold">{title}</h2>
          {!isMobile && <span className="text-zinc-500 text-xs">{subTitle}</span>}
        </div>
      </div>

      {btnText && (
        <button
          onClick={onBtnClick}
          className="bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          {isMobile ? getNavbarIcon(btnText) : (  // ← getNavbarIcon use karo
            <>
              <span>{icon}</span>
              {btnText}
            </>
          )}
        </button>
      )}

    </div>
  )
}

export default Navbar     