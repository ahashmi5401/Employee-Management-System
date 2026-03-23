import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'  // ← db missing tha
import { onValue, ref } from 'firebase/database'

const MyTaskCard = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)  // ← true hona chahiye
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const taskRef = ref(db, "tasks")
    const unsubTasks = onValue(taskRef, (snapshot) => {
      if (snapshot.exists()) {
        const taskData = snapshot.val()

        const subRef = ref(db, "submissions")
        onValue(subRef, (subSnapshot) => {
          const subData = subSnapshot.exists() ? subSnapshot.val() : {}  // ← exist() → exists()

          const myTasks = Object.entries(taskData)
            .filter(([_, val]) => val.assignedTo === currentUser.uid)  // ← () missing tha
            .map(([id, val]) => {  // ← () missing tha
              const submission = Object.values(subData).find(
                s => s.taskId === id && s.employeeId === currentUser.uid
              )
              return {  // ← return missing tha
                id,
                ...val,
                displayStatus: submission ? submission.status : val.status,
              }
            })

          setTasks(myTasks)
          setLoading(false)
        })
      } else {
        setTasks([])
        setLoading(false)
      }
    })

    return () => unsubTasks()
  }, [])  // ← [] missing tha

  const priorityStyle = (priority) => {
    if (priority === "High") return "bg-red-500/10 text-red-400 border border-red-500/20"
    if (priority === "Medium") return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
  }

  const statusStyle = (status) => {
    if (status === "Approved")  return "bg-green-500/10 text-green-400 border border-green-500/20"
    if (status === "Rejected")  return "bg-red-500/10 text-red-400 border border-red-500/20"
    if (status === "Pending")   return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
  }

  const borderLeft = (status) => {
    if (status === "Approved") return "border-l-4 border-green-500"
    if (status === "Rejected") return "border-l-4 border-red-500"
    return "border-l-4 border-amber-500"
  }

  if (loading) return <p className='text-zinc-500 text-xs px-4 py-3'>Loading...</p>

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 flex flex-col max-h-[320px]'>

      {/* Header */}
      <div className="flex px-4 py-3 items-center justify-between border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <div>
          <p className='text-white text-sm font-semibold'>My Tasks</p>
          <span className='text-zinc-500 text-xs'>Active assignments</span>
        </div>
        <NavLink to='/employee/tasks' className='text-red-500 hover:text-red-400 text-xs font-medium transition-all'>
          View all →
        </NavLink>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {tasks.map(({ id, title, desc, dueDate, priority, displayStatus }) => (
          <div key={id} className={`flex justify-between items-center ${borderLeft(displayStatus)} rounded-xl bg-zinc-950 px-3 py-3`}>
            <div className="flex flex-col gap-0.5">
              <h2 className='text-white text-sm font-medium'>{title}</h2>
              <p className='text-zinc-500 text-xs'>{desc}</p>
              <p className='text-zinc-600 text-xs'>Due: {dueDate}</p>
            </div>
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`${priorityStyle(priority)} text-xs font-semibold px-3 py-1 rounded-full`}>
                {priority}
              </span>
              <span className={`${statusStyle(displayStatus)} text-xs font-semibold px-3 py-1 rounded-full`}>
                {displayStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default MyTaskCard