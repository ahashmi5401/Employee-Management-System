import React, { useEffect, useState } from "react"
import { auth, db } from "../../firebase"
import { ref, onValue } from "firebase/database"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "../../hooks/useMediaQuery"

const MyTaskTable = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const navigate = useNavigate()
  const { isMobile, isTablet } = useMediaQuery()
  const showCards = isMobile || isTablet

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const tasksRef = ref(db, "tasks")
    const unsubTasks = onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const tasksData = snapshot.val()
        const subRef = ref(db, "submissions")
        onValue(subRef, (subSnapshot) => {
          const subsData = subSnapshot.exists() ? subSnapshot.val() : {}
          const myTasks = Object.entries(tasksData)
            .filter(([_, val]) => val.assignedTo === currentUser.uid)
            .map(([id, val]) => {
              const submission = Object.values(subsData).find(
                s => s.taskId === id && s.employeeId === currentUser.uid
              )
              return {
                id, ...val,
                displayStatus: submission ? submission.status : val.status,
                progressBar: submission ? submission.completion : 0,
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
  }, [])

  const filteredTasks = tasks
    .filter(task =>
      task.title?.toLowerCase().includes(search.toLowerCase()) ||
      task.desc?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => statusFilter === '' || task.displayStatus === statusFilter)
    .filter(task => priorityFilter === '' || task.priority === priorityFilter)

  const priorityStyle = (priority) => {
    if (priority === "High") return "bg-red-500/10 text-red-400 border border-red-500/20"
    if (priority === "Medium") return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
    return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
  }

  const statusStyle = (status) => {
    if (status === "Approved")  return "bg-green-500/10 text-green-400 border border-green-500/20"
    if (status === "Rejected")  return "bg-red-500/10 text-red-400 border border-red-500/20"
    if (status === "Completed") return "bg-green-500/10 text-green-400 border border-green-500/20"
    if (status === "Failed")    return "bg-red-500/10 text-red-400 border border-red-500/20"
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
  }

  const progressColor = (value) => {
    if (value < 30) return 'bg-red-500'
    if (value < 70) return 'bg-amber-500'
    return 'bg-green-500'
  }

  if (loading) return <p className='text-zinc-500 text-sm mt-4'>Loading tasks...</p>
  if (tasks.length === 0) return <p className='text-zinc-500 text-sm mt-4'>No tasks assigned yet.</p>

  return (
    <div className='flex flex-col gap-4'>

      {/* Search + Filter */}
      <div className='flex gap-2 flex-wrap mt-4'>
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search Task...'
          className='flex-1 bg-zinc-900 py-2.5 md:py-3 px-3 md:px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className='bg-zinc-900 py-2.5 md:py-3 px-3 md:px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none'>
          <option value=''>Priority</option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='bg-zinc-900 py-2.5 md:py-3 px-3 md:px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none'>
          <option value=''>All Status</option>
          <option value='Pending'>Pending</option>
          <option value='Approved'>Approved</option>
          <option value='Rejected'>Rejected</option>
        </select>
      </div>

      {/* Mobile + Tablet — Card View */}
      {showCards ? (
        <div className='flex flex-col gap-3 '>
          {filteredTasks.map(({ id, title, desc, priority, dueDate, displayStatus, progressBar }) => (
            <div key={id} className='bg-zinc-900 border border-zinc-800 rounded-2xl p-4'>

              <div className='flex justify-between items-start mb-3'>
                <div className='flex-1 mr-2'>
                  <p className='text-white text-sm font-medium'>{title}</p>
                  <p className='text-zinc-500 text-xs mt-0.5'>{desc}</p>
                </div>
                <span className={`${priorityStyle(priority)} text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0`}>
                  {priority}
                </span>
              </div>

              <div className='flex flex-col gap-1.5 mb-3'>
                <div className='flex justify-between'>
                  <span className='text-zinc-500 text-xs'>Due Date</span>
                  <span className='text-zinc-300 text-xs'>{dueDate}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-zinc-500 text-xs'>Status</span>
                  <span className={`${statusStyle(displayStatus)} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                    {displayStatus}
                  </span>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='flex justify-between'>
                    <span className='text-zinc-500 text-xs'>Progress</span>
                    <span className='text-zinc-300 text-xs'>{progressBar || 0}%</span>
                  </div>
                  <div className='h-1.5 bg-zinc-800 rounded-full overflow-hidden'>
                    <div
                      className={`h-full ${progressColor(progressBar || 0)} rounded-full`}
                      style={{ width: `${progressBar || 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className='flex gap-2'>
                <button className='flex-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-all'>
                  View
                </button>
                {displayStatus === 'Approved' || displayStatus === 'Completed' ? (
                  <button className='flex-1 bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 text-xs font-semibold py-2 rounded-lg cursor-not-allowed'>
                    Submitted
                  </button>
                ) : displayStatus === 'Rejected' ? (
                  <button
                    onClick={() => navigate('/employee/submitwork')}
                    className='flex-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-red-500/20 transition-all'>
                    Resubmit
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/employee/submitwork')}
                    className='flex-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-green-500/20 transition-all'>
                    Submit
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      ) : (
        // Desktop — Table View
        <div className="overflow-x-auto border border-zinc-800 rounded-2xl ">
          <table className='w-full border-collapse min-w-[800px]'>
            <thead>
              <tr className='bg-zinc-950 border-b border-zinc-800'>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[28%]'>Task</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Priority</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Due Date</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Status</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[18%]'>Progress</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[18%]'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(({ id, title, desc, priority, dueDate, displayStatus, progressBar }) => (
                <tr key={id} className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-all'>
                  <td className='px-4 py-3'>
                    <p className='text-white text-sm font-medium'>{title}</p>
                    <p className='text-zinc-500 text-xs mt-0.5'>{desc}</p>
                  </td>
                  <td className='px-4 py-3'>
                    <span className={`${priorityStyle(priority)} text-xs font-semibold px-3 py-1 rounded-full`}>{priority}</span>
                  </td>
                  <td className='px-4 py-3 text-zinc-500 text-sm'>{dueDate}</td>
                  <td className='px-4 py-3'>
                    <span className={`${statusStyle(displayStatus)} text-xs font-semibold px-3 py-1 rounded-full`}>{displayStatus}</span>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <div className='flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden'>
                        <div
                          className={`h-full ${progressColor(progressBar || 0)} rounded-full`}
                          style={{ width: `${progressBar || 0}%` }}
                        />
                      </div>
                      <span className='text-zinc-500 text-xs'>{progressBar || 0}%</span>
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex gap-2'>
                      <button className='bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all'>
                        View
                      </button>
                      {displayStatus === 'Approved' || displayStatus === 'Completed' ? (
                        <button className='bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 text-xs font-semibold px-3 py-1 rounded-lg cursor-not-allowed'>
                          Submitted
                        </button>
                      ) : displayStatus === 'Rejected' ? (
                        <button
                          onClick={() => navigate('/employee/submitwork')}
                          className='bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all'>
                          Resubmit
                        </button>
                      ) : (
                        <button
                          onClick={() => navigate('/employee/submitwork')}
                          className='bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-green-500/20 transition-all'>
                          Submit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default MyTaskTable