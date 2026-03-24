import React from 'react'
import Sidebar from '../../components/employee/Sidebar'
import Navbar from '../../components/employee/Navbar'
import InfoCard from '../../components/employee/InfoCard'
import QuickStats from '../../components/employee/QuickStat'
import PerformanceBarProfile from '../../components/employee/PerformanceBarProfile'
import UpdatePassword from '../../components/employee/UpdatePassword'

const Profile = () => {
  return (
     <div className='flex h-screen bg-zinc-950'> 
    <Sidebar />
    <div className='flex flex-col flex-1'>
      <Navbar title={"Profile"} subTitle={"Your Account , details"} btnText=''/>
      <main className='flex-1 overflow-y-auto p-6 scrollBar'>
        <div className="grid grid-cols-1 shrink-0 gap-3 md:grid-cols-2">
        <InfoCard />
        <QuickStats />
        <PerformanceBarProfile />
        <UpdatePassword />
        </div>
      </main>
    </div>
    </div>
  )
}

export default Profile