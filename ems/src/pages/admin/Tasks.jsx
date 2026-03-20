import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import StatList from '../../components/admin/StatList'
import TaskStats from '../../data/admin/TaskStats'
import TaskTable from '../../components/admin/TaskTable'

const Tasks = () => {
  return (
    <div className='flex h-screen bg-zinc-950'>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar title="Tasks" subTitle="Manage all tasks" btnText="Add Task"/>
        <main className='flex-1 flex flex-col overflow-y-auto p-6'>
        <StatList data={TaskStats} cols='grid-cols-4' />
        <TaskTable />
        </main>
      </div>
    </div>
  )
}

export default Tasks