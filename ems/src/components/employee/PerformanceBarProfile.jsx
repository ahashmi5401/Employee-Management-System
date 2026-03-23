import React from 'react'
import MyTaskData from '../../data/employee/MyTaskData'
import { useEmployeeStats } from '../../hooks/useEmployeeStats'

const Performance = () => {
  const stats = useEmployeeStats()

  const total = stats.totalTasks || 1

  const performanceData = [
    {
      label: "Task completion",
      value: Math.round((stats.completedTasks / total) * 100),
      color: "bg-green-500",
      textColor: "text-green-400"
    },
    {
      label: "Approval rate",
      value: Math.round((stats.approvedSubmissions / (stats.totalSubmissions || 1)) * 100),
      color: "bg-blue-500",
      textColor: "text-blue-400"
    },
    {
      label: "On time delivery",
      value: Math.round(((stats.totalTasks - (stats.pendingTasks || 0)) / total) * 100),
      color: "bg-purple-500",
      textColor: "text-purple-400"
    },
    {
      label: "High priority tasks",
      value: Math.round((stats.highPriorityTasks / total) * 100),
      color: "bg-red-500",
      textColor: "text-red-400"
    },
  ]

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 p-5'>

      <div className='border-b border-zinc-800 pb-3 mb-4'>
        <h2 className='text-white text-sm font-semibold'>Performance</h2>
        <span className='text-zinc-500 text-xs'>Based on your tasks</span>
      </div>

      <div className='flex flex-col gap-4'>
        {performanceData.map(({ label, value, color, textColor }) => (
          <div key={label}>
            <div className='flex justify-between items-center mb-1.5'>
              <span className='text-zinc-400 text-xs'>{label}</span>
              <span className={`${textColor} text-xs font-semibold`}>{value}%</span>
            </div>
            <div className='h-1.5 bg-zinc-800 rounded-full overflow-hidden'>
              <div
                className={`h-full ${color} rounded-full transition-all duration-700`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Performance