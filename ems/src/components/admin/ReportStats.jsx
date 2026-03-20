import StatList from './StatList'
import ReportStat from '../../data/admin/ReportStat'

import React from 'react'

const ReportStats = () => {
  return (
    <StatList data={ReportStat} cols='grid-cols-4' />
  )
}

export default ReportStats