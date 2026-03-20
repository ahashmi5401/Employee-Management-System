import MyTaskData from "./MyTaskData" 
 const total = MyTaskData.length
  const completed = MyTaskData.filter(t => t.status === 'Completed').length
  const approved = MyTaskData.filter(t => t.status === 'Completed').length
  const onTime = MyTaskData.filter(t => t.status !== 'Failed').length
  const high = MyTaskData.filter(t => t.priority === 'High').length

  const performanceData = [
    {
      label: "Task completion",
      value: Math.round((completed / total) * 100),
      color: "bg-green-500",
      textColor: "text-green-400"
    },
    {
      label: "Approval rate",
      value: Math.round((approved / total) * 100),
      color: "bg-blue-500",
      textColor: "text-blue-400"
    },
    {
      label: "On time delivery",
      value: Math.round((onTime / total) * 100),
      color: "bg-purple-500",
      textColor: "text-purple-400"
    },
    {
      label: "High priority tasks",
      value: Math.round((high / total) * 100),
      color: "bg-red-500",
      textColor: "text-red-400"
    },
  ]

export default performanceData