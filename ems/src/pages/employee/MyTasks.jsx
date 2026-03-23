import React from 'react'
import Sidebar from '../../components/employee/Sidebar'
import Navbar from '../../components/employee/Navbar'
import DashboardStat from '../../components/employee/DashboardStat'
import MyTaskTable from '../../components/employee/MyTaskTable'

const MyTasks = () => {
  return (
      <div className='flex h-screen bg-zinc-950 overflow-hidden'> 
    <Sidebar />
    <div className='flex flex-col flex-1 overflow-hidden'>
      <Navbar title={"My Tasks"} subTitle={"Welcome back , Ayan"} btnText=''/>
      <main className='flex-1 overflow-y-auto  p-6'>
        <DashboardStat />
        <MyTaskTable />
      </main>
    </div>
    </div>
  )
}

export default MyTasks