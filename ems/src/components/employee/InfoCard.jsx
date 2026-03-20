import React from 'react'

const InfoCard = () => {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1'>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            AH
          </div>
          <div>
            <h2 className='text-white text-sm font-semibold'>Muhammad Ayan Hashmi</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>Frontend Developer</p>
            <p className='text-zinc-600 text-xs font-mono'>EMP-001</p>
          </div>
        </div>
        <button className='bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-700 transition-all'>
          Edit
        </button>
      </div>

      {/* Info rows */}
      <div className="flex flex-col px-5">
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Email</span>
          <span className='text-zinc-300 text-xs'>ayan@smart-ems.com</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Department</span>
          <span className='text-zinc-300 text-xs'>Engineering</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Joined</span>
          <span className='text-zinc-300 text-xs'>Jan 1, 2025</span>
        </div>
        <div className="flex justify-between items-center py-2.5">
          <span className='text-zinc-500 text-xs'>Status</span>
          <span className='bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
            Active
          </span>
        </div>
      </div>

    </div>
  )
}

export default InfoCard
