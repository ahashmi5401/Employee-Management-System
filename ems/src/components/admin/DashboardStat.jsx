import StatList from './StatList'
import dashboardStat from '../../data/admin/dashboardStat'

import React from 'react'

const DashboardStat = () => {
  return (
     <StatList data = {dashboardStat} cols="grid-cols-4"/>
  )
}

export default DashboardStat;