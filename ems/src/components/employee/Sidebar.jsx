import React from "react";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import SidebarIcon from "../../data/employee/SidebarIcon";
const Sidebar = () => {
  return (
    <div className="w-[300px] bg-zinc-950 h-screen border-r border-zinc-800 flex flex-col">
      <div className="border-b border-zinc-800">
        <Logo />
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
              className={({ isActive }) =>
                `w-full rounded-lg py-2.5 px-4 flex items-center gap-3 text-sm transition-all duration-200
          ${isActive ? "bg-red-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`
              }
            >
              {icon}
              {text}
            </NavLink>
          </div>
        ))}
      </ul>

      {/* Footer */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-4 flex items-center gap-3">
        <div className="bg-red-600 rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
          <p className="text-white text-xs font-semibold">AH</p>
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-medium">Muhammad Ayan Hashmi</p>
          <span className="text-zinc-500 text-xs">Front End Developer</span>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="3.5" r="1" fill="#52525b" />
          <circle cx="7" cy="7" r="1" fill="#52525b" />
          <circle cx="7" cy="10.5" r="1" fill="#52525b" />
        </svg>
      </div>
    </div>
  );
};

export default Sidebar;
