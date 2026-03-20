import React from 'react'
import ReportList from './ReportList'
import CreateReport from './CreateReport'

const ReportStatusCreate = () => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <ReportList />
      <CreateReport />
    </div>
  )
}

export default ReportStatusCreate