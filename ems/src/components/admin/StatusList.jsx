import React from 'react'
import { NavLink } from 'react-router-dom'

const StatusList = ({ title, data, viewAllLink }) => {
  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-2xl flex-1 flex flex-col max-h-[320px]'>
      
      {/* Header */}
      <div className="flex justify-between px-4 py-3 items-center border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <h2 className="text-white text-sm font-semibold">{title}</h2>
        <NavLink
          to={viewAllLink}
          className="text-red-500 cursor-pointer hover:text-red-400 text-xs font-medium transition-all"
        >
          View all
        </NavLink>
      </div>

      {/* List */}
      <div className="scrollBar flex flex-col gap-2 px-3 py-3 overflow-y-auto">
        {data?.map((item) => {
          const { id, taskTitle, assignTo, timeAgo, status, statusStyle, borderLeft } = item
          return (
            <div key={id} className={`bg-zinc-950 rounded-xl px-3 py-3 ${borderLeft}`}>
              <div className="flex justify-between items-center">
                <p className="text-white text-sm font-medium">{taskTitle}</p>
                <span className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-zinc-500 text-xs">{assignTo}</span>
                <span className="text-zinc-700 text-xs">·</span>
                <span className="text-zinc-600 text-xs">{timeAgo}</span>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default StatusList