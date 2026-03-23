import React, { useEffect, useState } from "react"
import { db } from "../../firebase"
import { ref, onValue } from "firebase/database"
import { deleteTask } from "../../utils/deleteTask"
import ConfirmModal from "../ConfirmModal"
import Input from './Input'
import { useMediaQuery } from "../../hooks/useMediaQuery"

const TaskTable = ({ onEdit }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const { isMobile, isTablet } = useMediaQuery()
  const showCards = isMobile || isTablet

  useEffect(() => {
    const tasksRef = ref(db, 'tasks')
    const unsub = onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const taskList = Object.entries(data).map(([id, val]) => ({ id, ...val }))
        setTasks(taskList)
      } else {
        setTasks([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleDelete = (id) => {
    setConfirmAction({ fn: async () => {
      await deleteTask(id)
      setShowConfirm(false)
    }})
    setShowConfirm(true)
  }

  const filterDataSearch = tasks
    .filter(t =>
      t.assignedToName?.toLowerCase().includes(search.toLowerCase()) ||
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.desc?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(t => priorityFilter === '' || t.priority === priorityFilter)
    .filter(t => statusFilter === '' || t.status === statusFilter)

  const priorityStyle = (priority) => {
    if (priority === 'High') return 'bg-red-500/10 text-red-400 border border-red-500/20'
    if (priority === 'Medium') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
    return 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
  }

  const statusStyle = (status) => {
    if (status === 'Completed') return 'bg-green-500/10 text-green-400 border border-green-500/20'
    if (status === 'Failed') return 'bg-red-500/10 text-red-400 border border-red-500/20'
    return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  }

  if (loading) return <p className='text-zinc-500 text-sm mt-4'>Loading tasks...</p>

  return (
    <>
      <div className='flex flex-col gap-4'>

        {/* Search + Filter */}
        <div className='flex gap-2 flex-wrap mt-10'>
          <Input
            search={search}
            setSearch={setSearch}
            placeholder="Search Task..."
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
            <option value='Completed'>Completed</option>
            <option value='Failed'>Failed</option>
          </select>
        </div>

        {/* Mobile + Tablet — Card View */}
        {showCards ? (
          <div className='flex flex-col gap-3'>
            {filterDataSearch.map(({ id, title, desc, assignedToName, priority, dueDate, status }) => (
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
                    <span className='text-zinc-500 text-xs'>Assigned To</span>
                    <span className='text-zinc-300 text-xs'>{assignedToName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-zinc-500 text-xs'>Due Date</span>
                    <span className='text-zinc-300 text-xs'>{dueDate}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-zinc-500 text-xs'>Status</span>
                    <span className={`${statusStyle(status)} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                      {status}
                    </span>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={() => onEdit({ id, title, desc, priority, dueDate, status })}
                    className='flex-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-all'>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className='flex-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-red-500/20 transition-all'>
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          // Desktop — Table View
          <div className='overflow-x-auto border border-zinc-800 rounded-2xl'>
            <table className='w-full border-collapse min-w-[800px]'>
              <thead>
                <tr className='bg-zinc-950 border-b border-zinc-800'>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[25%]'>Task</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[20%]'>Assigned To</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]'>Priority</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Due Date</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Status</th>
                  <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[16%]'>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterDataSearch.map(({ id, title, desc, assignedToName, priority, dueDate, status }) => (
                  <tr key={id} className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-all'>
                    <td className='px-4 py-3'>
                      <p className='text-white text-sm font-medium'>{title}</p>
                      <p className='text-zinc-500 text-xs mt-0.5'>{desc}</p>
                    </td>
                    <td className='px-4 py-3 text-zinc-400 text-sm'>{assignedToName}</td>
                    <td className='px-4 py-3'>
                      <span className={`${priorityStyle(priority)} text-xs font-semibold px-3 py-1 rounded-full`}>{priority}</span>
                    </td>
                    <td className='px-4 py-3 text-zinc-500 text-sm'>{dueDate}</td>
                    <td className='px-4 py-3'>
                      <span className={`${statusStyle(status)} text-xs font-semibold px-3 py-1 rounded-full`}>{status}</span>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => onEdit({ id, title, desc, priority, dueDate, status })}
                          className='bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all'>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(id)}
                          className='bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all'>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Yes, Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={confirmAction?.fn}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}

export default TaskTable