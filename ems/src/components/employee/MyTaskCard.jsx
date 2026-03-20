import React from 'react'
import MyTaskData from '../../data/employee/MyTaskData'
import { NavLink } from 'react-router-dom'

const MyTaskCard = () => {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-3/12 flex flex-col max-h-[320px]'>
      
      {/* Header */}
      <div className="flex px-4 py-3 items-center justify-between border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <div>
          <p className='text-white text-sm font-semibold'>My Tasks</p>
          <span className='text-zinc-500 text-xs'>Active assignments</span>
        </div>
        <NavLink to='/employee/tasks' className='text-red-500 hover:text-red-400 text-xs font-medium transition-all'>
          View all →
        </NavLink>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {MyTaskData.map(({ id, title, desc, dueDate, priority, priorityStyle, status, statusStyle, borderLeft }) => (
          <div key={id} className={`flex justify-between items-center ${borderLeft} rounded-xl bg-zinc-950 px-3 py-3`}>
            
            <div className="flex flex-col gap-0.5">
              <h2 className='text-white text-sm font-medium'>{title}</h2>
              <p className='text-zinc-500 text-xs'>{desc}</p>
              <p className='text-zinc-600 text-xs'>Due: {dueDate}</p>
            </div>

            <div className="flex  gap-1.5 items-end">
              <span className={`${priorityStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                {priority}
              </span>
              <span className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                {status}
              </span>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default MyTaskCard