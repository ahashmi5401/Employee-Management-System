import React from 'react'
import EmployeeStatus from './EmployeeStatus'
import TaskSubmissionStatus from './TaskSubmissionStatus'

const DashboardStatus = () => {
  return (
    <div className='flex gap-3'>
        <EmployeeStatus />
        <TaskSubmissionStatus />
    </div>
  )
}

export default DashboardStatus