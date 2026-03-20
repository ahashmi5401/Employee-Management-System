import StatList from "./StatList";
import SubmissionStatsData from "../../data/admin/SubmissionStats"

import React from 'react'

const SubmissionStat = () => {
  return (
    <StatList data={SubmissionStatsData} cols='grid-cols-4'/>
  )
}

export default SubmissionStat