import React from 'react'
import Input from './Input'
import MyTaskData from '../../data/employee/MyTaskData'
import { useNavigate } from 'react-router-dom'

const MyTaskTable = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-4'>

      {/* Search + Filter */}
      <div className='flex gap-3'>
        <Input placeholder="Search Task..." />
        <select className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none">
          <option value="">Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className='overflow-x-auto border border-zinc-800 rounded-2xl'>
        <table className='w-full border-collapse min-w-[700px]'>
          <thead>
            <tr className='bg-zinc-950 border-b border-zinc-800'>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[28%]'>Task</th>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Priority</th>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Due Date</th>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Status</th>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[18%]'>Progress</th>
              <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[18%]'>Action</th>
            </tr>
          </thead>
          <tbody>
            {MyTaskData.map(({ id, title, desc, dueDate, priority, priorityStyle, status, statusStyle, progress, progressColor }) => (
              <tr key={id} className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-all'>

                {/* Task */}
                <td className='px-4 py-3'>
                  <p className='text-white text-sm font-medium'>{title}</p>
                  <p className='text-zinc-500 text-xs mt-0.5'>{desc}</p>
                </td>

                {/* Priority */}
                <td className='px-4 py-3'>
                  <span className={`${priorityStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                    {priority}
                  </span>
                </td>

                {/* Due Date */}
                <td className='px-4 py-3 text-zinc-500 text-sm'>{dueDate}</td>

                {/* Status */}
                <td className='px-4 py-3'>
                  <span className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                    {status}
                  </span>
                </td>

                {/* Progress */}
                <td className='px-4 py-3'>
                  <div className='flex items-center gap-2'>
                    <div className='flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden'>
                      <div
                        className={`h-full ${progressColor} rounded-full`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className='text-zinc-500 text-xs font-medium'>{progress}%</span>
                  </div>
                </td>

                {/* Action */}
                <td className='px-4 py-3'>
                  <div className='flex gap-2'>
                    <button className='bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all'>
                      View
                    </button>
                    {status === 'Completed' ? (
                      <button className='bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 text-xs font-semibold px-3 py-1 rounded-lg cursor-not-allowed'>
                        Submitted
                      </button>
                    ) : status === 'Failed' ? (
                      <button
                        onClick={() => navigate('/employee/submit')}
                        className='bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all'>
                        Resubmit
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate('/employee/submit')}
                        className='bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-green-500/20 transition-all'>
                        Submit
                      </button>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default MyTaskTable