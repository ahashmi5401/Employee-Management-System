export const getDashboardStats = (stats) => [
  { id: 1, label: "Total Tasks",   value: stats.totalTasks,        color: "text-blue-400",  msg: "Assigned" },
  { id: 2, label: "Pending",       value: stats.pendingTasks,      color: "text-amber-400", msg: "In progress" },
  { id: 3, label: "Completed",     value: stats.completedTasks,    color: "text-green-400", msg: "Done" },
  { id: 4, label: "High Priority", value: stats.highPriorityTasks, color: "text-red-400",   msg: "Urgent" },
]
export const getHistoryStats = (stats) => [
  { id: 1, label: "Total Submissions", value: stats.totalSubmissions,    color: "text-blue-400",  msg: "All time" },
  { id: 2, label: "Approved",          value: stats.approvedSubmissions,  color: "text-green-400", msg: "Accepted" },
  { id: 3, label: "Rejected",          value: stats.rejectedSubmissions,  color: "text-red-400",   msg: "Revision" },
]