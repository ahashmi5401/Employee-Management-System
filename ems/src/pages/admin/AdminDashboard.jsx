import React from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import DashboardStat from '../../components/admin/DashboardStat'
import DashboardStatus from '../../components/admin/DashboardStatus'
import logout from '../../utils/logout'

const AdminDashboard = () => {
  return (
    <div className='flex h-screen bg-zinc-950 overflow-y-auto scrollBar'>
      
      <Sidebar />

      <div className='flex flex-col flex-1'>
        <Navbar title="Dashboard" subTitle="Welcome back, Admin" btnText={"Log Out"} onBtnClick={logout} />
        <main className='flex-1 overflow-y-auto p-6 scrollBar'>
          <DashboardStat />
          {/* page content yahan aayega */}
          <DashboardStatus />
        </main>
      </div>

    </div>
  )
}

export default AdminDashboard
