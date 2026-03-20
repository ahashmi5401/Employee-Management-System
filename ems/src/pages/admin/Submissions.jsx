import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import SubmissionStats from '../../components/admin/SubmissionStat'
import SubmissionTable from '../../components/admin/SubmissionTable'

const Submissions = () => {
  return (
    <div className='flex h-screen bg-zinc-950'>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar title="Submissions" subTitle="Review submissions" btnText='Add Employee' />
        <main className='flex-1 flex flex-col overflow-y-auto p-6'>
          <SubmissionStats />
          <SubmissionTable />
        </main>
      </div>
    </div>
  )
}

export default Submissions