import React from 'react'
import MyTaskCard from './MyTaskCard'
import NotificationCard from './NotificationCard'
import ProgressBarDashboard from './ProgressBarDashboard'

const DashboardStatus = () => {
  return (

    <div className='flex flex-col gap-4 p-2'>
        <div className='flex flex-col gap-4 p-2 md:flex-row'>
        <MyTaskCard />
        <NotificationCard />
        </div>
        <ProgressBarDashboard />
    </div>
  )
}

export default DashboardStatus