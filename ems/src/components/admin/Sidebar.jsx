import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import navItems from '../../data/admin/SidebarData'

const Sidebar = () => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery()
  const [isOpen, setIsOpen] = useState(false)

  // Desktop — full sidebar
  if (isDesktop) {
    return (
      <div className='w-[220px] min-w-[220px] bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen'>
        {/* Logo */}
        <div className='px-5 py-4 border-b border-zinc-800 flex items-center gap-3'>
          <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center'>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5" cy="4" r="2.2" fill="white"/>
              <path d="M1 12c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className='text-white text-sm font-bold'>Smart<span className='text-red-500'>EMS</span></p>
            <p className='text-zinc-600 text-[9px] tracking-widest uppercase'>Employee System</p>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className='border-t border-zinc-800 px-4 py-3 flex items-center gap-3'>
          <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold'>AD</div>
          <div>
            <p className='text-white text-xs font-medium'>Admin</p>
            <p className='text-zinc-500 text-xs'>Super Admin</p>
          </div>
        </div>
      </div>
    )
  }

  // Tablet — icon only sidebar
  if (isTablet) {
    return (
      <>
        <div className='w-[56px] min-w-[56px] bg-zinc-950 border-r border-zinc-800 flex flex-col h-screen'>
          <div className='px-3 py-4 border-b border-zinc-800 flex justify-center'>
            <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="5" cy="4" r="2.2" fill="white"/>
                <path d="M1 12c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <nav className='flex flex-col gap-1 px-2 py-4 flex-1'>
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                title={label}
                className={({ isActive }) =>
                  `flex items-center justify-center w-10 h-10 rounded-xl transition-all mx-auto ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`
                }
              >
                {icon}
              </NavLink>
            ))}
          </nav>
          <div className='border-t border-zinc-800 px-2 py-3 flex justify-center'>
            <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold'>AD</div>
          </div>
        </div>
      </>
    )
  }

  // Mobile — drawer
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/60 z-40'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Hamburger button — Navbar mein dikhega */}
      <button
        onClick={() => setIsOpen(true)}
        className='fixed top-3.5 left-4 z-50 w-8 h-8 bg-zinc-800 rounded-lg flex flex-col items-center justify-center gap-1.5 md:hidden'
      >
        <div className='w-4 h-0.5 bg-zinc-400 rounded'/>
        <div className='w-4 h-0.5 bg-zinc-400 rounded'/>
        <div className='w-4 h-0.5 bg-zinc-400 rounded'/>
      </button>

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[240px] bg-zinc-950 border-r border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo + close */}
        <div className='px-5 py-4 border-b border-zinc-800 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center'>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="5" cy="4" r="2.2" fill="white"/>
                <path d="M1 12c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <p className='text-white text-sm font-bold'>Smart<span className='text-red-500'>EMS</span></p>
          </div>
          <button onClick={() => setIsOpen(false)} className='text-zinc-500 hover:text-white'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className='flex flex-col gap-1 px-3 py-4 flex-1'>
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className='border-t border-zinc-800 px-4 py-3 flex items-center gap-3'>
          <div className='w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold'>AD</div>
          <div>
            <p className='text-white text-xs font-medium'>Admin</p>
            <p className='text-zinc-500 text-xs'>Super Admin</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar