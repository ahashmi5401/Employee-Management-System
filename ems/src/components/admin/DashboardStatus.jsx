import React from 'react'
import EmployeeStatus from './EmployeeStatus'
import TaskSubmissionStatus from './TaskSubmissionStatus'

const DashboardStatus = () => {
  return (
    <div className='flex gap-3 mt-10  px-6 pb-6 flex-col md:flex-row'>
        <EmployeeStatus />
        <TaskSubmissionStatus />
    </div>
  )
}

export default DashboardStatus