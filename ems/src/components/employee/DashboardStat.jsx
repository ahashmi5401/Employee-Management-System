import React from 'react'
import StatList from '../admin/StatList'
import {useEmployeeStats} from '../../hooks/useEmployeeStats'
import { getDashboardStats } from '../../data/employee/EmployeeStatConfig'
const DashboardStat = () => {
  const stats = useEmployeeStats()
  return (
    <StatList data={getDashboardStats(stats)} cols='grid-cols-4'/>
  )
}

export default DashboardStat