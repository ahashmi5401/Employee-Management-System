import React from 'react'
import MyTaskCard from './MyTaskCard'
import NotificationCard from './NotificationCard'
import ProgressBarDashboard from './ProgressBarDashboard'

const DashboardStatus = () => {
  return (

    <div className='flex flex-col gap-2 p-2'>
        <div className='flex gap-2 p-2'>
        <MyTaskCard />
        <NotificationCard />
        </div>
        <ProgressBarDashboard />
    </div>
  )
}

export default DashboardStatus