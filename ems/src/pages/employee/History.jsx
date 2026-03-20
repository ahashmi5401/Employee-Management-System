import React from 'react'
import Sidebar from '../../components/employee/Sidebar'
import Navbar from '../../components/employee/Navbar'
import StatList from '../../components/admin/StatList'
import HistoryStats from '../../data/employee/HistoryStat'
import MyTaskData from '../../data/employee/MyTaskData'

const History = () => {
  return (
    <div className='flex h-screen bg-zinc-950'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Navbar title="History" subTitle="Your submission history" />
        <main className='flex-1 overflow-y-auto p-6 flex flex-col gap-4'>

          <StatList data={HistoryStats} cols='grid-cols-3' />

          <div className='overflow-x-auto border border-zinc-800 rounded-2xl'>
            <table className='w-full border-collapse min-w-[700px]'>
              <thead>
                <tr className='bg-zinc-950 border-b border-zinc-800'>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[25%]'>Task</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[14%]'>Submitted</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]'>Hours</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Status</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[39%]'>Admin Note</th>
                </tr>
              </thead>
              <tbody>
                {MyTaskData.map(({ id, title, desc, status, statusStyle, submission }) => (
                  <tr key={id} className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-all'>
                    <td className='px-4 py-3'>
                      <p className='text-white text-sm font-medium'>{title}</p>
                      <p className='text-zinc-500 text-xs mt-0.5'>{desc}</p>
                    </td>
                    <td className='px-4 py-3 text-zinc-400 text-sm'>{submission?.submittedAt}</td>
                    <td className='px-4 py-3 text-zinc-400 text-sm font-medium'>{submission?.hours} hrs</td>
                    <td className='px-4 py-3'>
                      <span className={`${statusStyle} text-xs font-semibold px-3 py-1 rounded-full`}>
                        {status}
                      </span>
                    </td>
                    <td className='px-4 py-3 text-zinc-500 text-xs leading-relaxed'>{submission?.adminNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  )
}

export default History