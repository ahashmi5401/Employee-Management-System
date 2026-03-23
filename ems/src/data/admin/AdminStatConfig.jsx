// src/data/admin/adminStatConfig.js

export const getDashboardStats = (stats) => [
  { id: 1, label: "Total Employees", value: stats.totalEmployees,   color: "text-blue-400",   msg: "Active members" },
  { id: 2, label: "Total Admins",    value: stats.totalAdmins,      color: "text-purple-400", msg: "Managing system" },
  { id: 3, label: "Total Tasks",     value: stats.totalTasks,       color: "text-red-400",    msg: "Assigned tasks" },
  { id: 4, label: "Submissions",     value: stats.totalSubmissions, color: "text-amber-400",  msg: `${stats.pendingSubmissions} pending` },
  { id: 5, label: "Completed",       value: stats.completedTasks,   color: "text-green-400",  msg: "Tasks done" },
]
export const getEmployeePageStats = (stats) =>{
  console.log("total admin" , stats.totalAdmins)
    return [
    { id: 1, label: "Total Employees", value: stats.totalEmployees, color: "text-blue-400",  msg: "All members" },
    { id: 2, label: "Total Admins",    value: stats.totalAdmins,      color: "text-purple-400", msg: "Managing system" },
    { id: 3, label: "Active",          value: stats.totalEmployees, color: "text-green-400", msg: "Currently working" },
    { id: 4, label: "Inactive",        value: 0,                    color: "text-amber-400", msg: "On leave" },
]
  }

export const getTaskPageStats = (stats) => [
  { id: 1, label: "Total Tasks",    value: stats.totalTasks,        color: "text-blue-400",  msg: "All tasks" },
  { id: 2, label: "High Priority",  value: stats.highPriorityTasks, color: "text-red-400",   msg: "Urgent" },
  { id: 3, label: "Pending",        value: stats.pendingTasks,      color: "text-amber-400", msg: "In progress" },
  { id: 4, label: "Completed",      value: stats.completedTasks,    color: "text-green-400", msg: "Done" },
]

export const getSubmissionPageStats = (stats) => [
  { id: 1, label: "Total",    value: stats.totalSubmissions,    color: "text-blue-400",  msg: "All submissions" },
  { id: 2, label: "Pending",  value: stats.pendingSubmissions,  color: "text-amber-400", msg: "Needs review" },
  { id: 3, label: "Approved", value: stats.approvedSubmissions, color: "text-green-400", msg: "Accepted" },
  { id: 4, label: "Rejected", value: stats.rejectedSubmissions, color: "text-red-400",   msg: "Declined" },
]

export const getReportPageStats = (stats) => [
  { id: 1, label: "Total Reports",      value: stats.totalReports,       color: "text-blue-400",   msg: "All time" },
  { id: 2, label: "This Month",         value: stats.thisMonthReports,   color: "text-green-400",  msg: "Generated" },
  { id: 3, label: "Task Reports",       value: stats.taskReports,        color: "text-amber-400",  msg: "Generated" },
  { id: 4, label: "Submission Reports", value: stats.submissionReports,  color: "text-purple-400", msg: "Generated" },
]