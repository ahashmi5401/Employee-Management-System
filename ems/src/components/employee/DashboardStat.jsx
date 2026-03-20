import React from 'react'
import StatList from '../admin/StatList'
import MyTaskStat from '../../data/employee/MyTaskStat'
const DashboardStat = () => {
  return (
    <StatList data={MyTaskStat} cols='grid-cols-4'/>
  )
}

export default DashboardStat