import React from 'react'
import TaskStatus from '../../data/admin/TaskStatus'
import { NavLink } from 'react-router-dom'
import StatusList from './StatusList'

const TaskSubmissionStatus = () => {
  return (
    <StatusList data={TaskStatus} title={"Recent Submission"} viewAllLink="/admin/submissions"/>
  )
}

export default TaskSubmissionStatus