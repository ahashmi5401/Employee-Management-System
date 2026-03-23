import StatList from "./StatList";
import React from 'react'
import { useAdminStats } from "../../hooks/useStats";
import { getSubmissionPageStats } from '../../data/admin/AdminStatConfig'

const SubmissionStat = () => {
 let  stats = useAdminStats()
  return (
    <StatList data={getSubmissionPageStats(stats)} cols='grid-cols-4'/>
  )
}

export default SubmissionStat