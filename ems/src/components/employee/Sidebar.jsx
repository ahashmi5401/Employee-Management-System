import React, { useState } from "react"
import Logo from "../Logo"
import { NavLink } from "react-router-dom"
import SidebarIcon from "../../data/employee/SidebarIcon"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useUserProfile } from "../../hooks/useUserProfile"

const Sidebar = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)
  const { profile } = useUserProfile()

  const getInitials = (name) => {
    if (!name) return 'EM'
    const parts = name.split(' ')
    return parts[0]?.charAt(0) + (parts[1]?.charAt(0) || '')
  }

  const renderNavItems = () => (
    <ul className="px-3 flex flex-col gap-1 mt-4 flex-1">
      {SidebarIcon.map(({ to, icon, text, section }) => (
        <div key={to}>
          {section && !isTablet && (
            <p className="text-zinc-600 text-xs font-semibold tracking-widest uppercase px-4 pt-4 pb-1">
              {section}
            </p>
          )}
          <NavLink
            to={to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `w-full rounded-lg py-2.5 flex items-center gap-3 text-sm transition-all duration-200 ${
                isTablet ? 'justify-center px-2' : 'px-4'
              } ${
                isActive ? "bg-red-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            {icon}
            {!isTablet && text}
          </NavLink>
        </div>
      ))}
    </ul>
  )

  const renderFooter = () => (
    <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-4 flex items-center gap-3">
      <div className="bg-red-600 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
        <p className="text-white text-xs font-semibold">{getInitials(profile?.name)}</p>
      </div>
      {!isTablet && (
        <div className="flex-1">
          <p className="text-white text-sm font-medium">{profile?.name || 'Employee'}</p>
          <span className="text-zinc-500 text-xs">{profile?.designation || ''}</span>
        </div>
      )}
    </div>
  )

  // Desktop
  if (isDesktop) {
    return (
      <div className="w-[260px] min-w-[260px] bg-zinc-950 h-screen border-r border-zinc-800 flex flex-col">
        <div className="border-b border-zinc-800">
          <Logo />
        </div>
        {renderNavItems()}
        {renderFooter()}
      </div>
    )
  }

  // Tablet — icon only
  if (isTablet) {
    return (
      <div className="w-[56px] min-w-[56px] bg-zinc-950 h-screen border-r border-zinc-800 flex flex-col">
        <div className="border-b border-zinc-800 flex justify-center py-4">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <p className="text-white text-xs font-bold">E</p>
          </div>
        </div>
        {renderNavItems()}
        {renderFooter()}
      </div>
    )
  }

  // Mobile — drawer
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3.5 left-4 z-50 w-8 h-8 bg-zinc-800 rounded-lg flex flex-col items-center justify-center gap-1.5"
      >
        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
        <div className="w-4 h-0.5 bg-zinc-400 rounded" />
      </button>

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[260px] bg-zinc-950 border-r border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="border-b border-zinc-800 flex items-center justify-between px-4 py-3">
          <Logo />
          <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <ul className="px-3 flex flex-col gap-1 mt-4 flex-1">
          {SidebarIcon.map(({ to, icon, text, section }) => (
            <div key={to}>
              {section && (
                <p className="text-zinc-600 text-xs font-semibold tracking-widest uppercase px-4 pt-4 pb-1">
                  {section}
                </p>
              )}
              <NavLink
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `w-full rounded-lg py-2.5 px-4 flex items-center gap-3 text-sm transition-all duration-200 ${
                    isActive ? "bg-red-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`
                }
              >
                {icon}
                {text}
              </NavLink>
            </div>
          ))}
        </ul>

        <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-4 flex items-center gap-3">
          <div className="bg-red-600 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
            <p className="text-white text-xs font-semibold">{getInitials(profile?.name)}</p>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{profile?.name || 'Employee'}</p>
            <span className="text-zinc-500 text-xs">{profile?.designation || ''}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar