import React from 'react'
import { NavLink } from 'react-router-dom'
import MyTaskData from '../../data/employee/MyTaskData'

const NotificationCard = () => {
  return (
    <div className=' bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 flex flex-col max-h-[320px]'>

      {/* Header */}
      <div className="flex px-4 py-3 items-center justify-between border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <div>
          <p className='text-white text-sm font-semibold'>Notifications</p>
          <span className='text-zinc-500 text-xs'>Recent updates</span>
        </div>
        <div style={{width:'7px',height:'7px',borderRadius:'50%',background:'#22c55e'}}></div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {MyTaskData.map(({ id, notification: { msg, time, dotColor } }) => (
          <div key={id} className="flex gap-3 bg-zinc-950 w-full px-3 py-3 rounded-xl items-start">
            <div
              className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
              style={{ background: dotColor }}
            />
            <div className="flex flex-col gap-0.5">
              <p className='text-white text-xs font-medium'>{msg}</p>
              <span className='text-zinc-500 text-xs'>{time}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default NotificationCard
