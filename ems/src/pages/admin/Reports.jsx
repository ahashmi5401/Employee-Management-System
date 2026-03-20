import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import ReportStats from '../../components/admin/ReportStats'
import ReportStatusCreate from '../../components/admin/ReportStatusCreate'

const Reports = () => {
  return (
    <div className='flex h-screen bg-zinc-950'>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar title="Reports" subTitle="View all reports" />
        <main className='flex-1 flex flex-col overflow-y-auto p-6'>
          <ReportStats />
          <ReportStatusCreate />
        </main>
      </div>
    </div>
  )
}

export default Reports