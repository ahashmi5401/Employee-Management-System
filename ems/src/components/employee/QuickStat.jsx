import React from 'react'
import MyTaskData from '../../data/employee/MyTaskData'

const QuickStats = () => {

  const total = MyTaskData.length
  const completed = MyTaskData.filter(t => t.status === 'Completed').length
  const pending = MyTaskData.filter(t => t.status === 'Pending').length
  const hours = MyTaskData.reduce((acc, t) => acc + (t.submission?.hours || 0), 0)

  const stats = [
    { label: "Total Tasks",   value: total,     color: "text-white"   },
    { label: "Completed",     value: completed,  color: "text-green-400" },
    { label: "Pending",       value: pending,    color: "text-amber-400" },
    { label: "Hours Logged",  value: `${hours}h`, color: "text-purple-400" },
  ]

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 p-5'>

      {/* Header */}
      <div className='border-b border-zinc-800 pb-3 mb-4'>
        <h2 className='text-white text-sm font-semibold'>Quick stats</h2>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-2 gap-3'>
        {stats.map(({ label, value, color }) => (
          <div key={label} className='bg-zinc-950 rounded-xl p-3'>
            <p className='text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-2'>{label}</p>
            <p className={`${color} text-2xl font-bold tracking-tight`}>{value}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default QuickStats