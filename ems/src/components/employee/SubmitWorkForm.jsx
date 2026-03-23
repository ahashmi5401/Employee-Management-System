import React, { useState, useEffect } from 'react'
import { db, auth } from '../../firebase'
import { ref, onValue, get, push, set } from 'firebase/database'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export const submitWork = async (taskId, taskTitle, description, hours, completion, notes) => {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) return { success: false, error: 'Not logged in' }

    const userSnapshot = await get(ref(db, `users/${currentUser.uid}`))
    const userData = userSnapshot.exists() ? userSnapshot.val() : {}
    const employeeName = userData.name || 'Employee'

    const submissionRef = push(ref(db, 'submissions'))
    await set(submissionRef, {
      taskId,
      taskTitle,
      employeeId: currentUser.uid,
      employeeName,
      description,
      hoursSpent: parseInt(hours),
      completion: parseInt(completion),
      notes,
      status: 'Pending',
      submittedAt: Date.now(),
    })

    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

const SubmitWorkForm = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState('')
  const [completion, setCompletion] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const { isMobile, isTablet } = useMediaQuery()
  const showCards = isMobile || isTablet

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const tasksRef = ref(db, 'tasks')
    const unsub = onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const myTasks = Object.entries(data)
          .filter(([_, val]) => val.assignedTo === currentUser.uid)
          .map(([id, val]) => ({ id, ...val }))
        setTasks(myTasks)
        if (myTasks.length > 0) setSelectedTask(myTasks[0])
      }
    })
    return () => unsub()
  }, [])

  const handleTaskChange = (e) => {
    const task = tasks.find(t => t.id === e.target.value)
    setSelectedTask(task)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description || !hours || !completion) {
      setError('Please fill all required fields')
      return
    }
    if (!selectedTask) {
      setError('Please select a task')
      return
    }
    setLoading(true)
    setError('')

    const result = await submitWork(
      selectedTask.id,
      selectedTask.title,
      description,
      hours,
      completion,
      notes
    )

    if (result.success) {
      setSuccess(true)
      setDescription('')
      setHours('')
      setCompletion('')
      setNotes('')
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const TaskDetails = () => (
    <div className='flex flex-col'>
      <div className='flex justify-between py-2.5 border-b border-zinc-800'>
        <span className='text-zinc-500 text-xs'>Task</span>
        <span className='text-white text-xs font-medium'>{selectedTask?.title}</span>
      </div>
      <div className='flex justify-between py-2.5 border-b border-zinc-800'>
        <span className='text-zinc-500 text-xs'>Priority</span>
        <span className='text-white text-xs'>{selectedTask?.priority}</span>
      </div>
      <div className='flex justify-between py-2.5 border-b border-zinc-800'>
        <span className='text-zinc-500 text-xs'>Due Date</span>
        <span className='text-white text-xs'>{selectedTask?.dueDate}</span>
      </div>
      <div className='flex justify-between py-2.5 border-b border-zinc-800'>
        <span className='text-zinc-500 text-xs'>Status</span>
        <span className='text-white text-xs'>{selectedTask?.status}</span>
      </div>
      <div className='py-2.5'>
        <span className='text-zinc-500 text-xs'>Description</span>
        <p className='text-zinc-400 text-xs mt-1.5 leading-relaxed'>{selectedTask?.desc}</p>
      </div>
    </div>
  )

  return (
    <div className={`flex gap-4 ${showCards ? 'flex-col' : 'flex-row'}`}>

      {/* FORM */}
      <div className='flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4'>

        <div className='border-b border-zinc-800 pb-3'>
          <h2 className='text-white text-sm font-semibold'>Work submission form</h2>
          <span className='text-zinc-500 text-xs'>Fill all details carefully</span>
        </div>

        {success && (
          <div className='bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3'>
            <p className='text-green-400 text-sm font-medium'>✓ Work submitted successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Select Task</label>
            <select
              onChange={handleTaskChange}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
            >
              {tasks.length === 0 && <option value=''>No tasks assigned</option>}
              {tasks.map(({ id, title, priority }) => (
                <option key={id} value={id}>{title} — {priority}</option>
              ))}
            </select>
          </div>

          {/* Mobile — Task Details toggle */}
          {showCards && selectedTask && (
            <div className='bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden'>
              <button
                type='button'
                onClick={() => setShowDetails(!showDetails)}
                className='w-full flex justify-between items-center px-4 py-3 text-zinc-400 text-xs font-semibold tracking-widest uppercase'
              >
                Task Details
                <span>{showDetails ? '▲' : '▼'}</span>
              </button>
              {showDetails && (
                <div className='px-4 pb-3'>
                  <TaskDetails />
                </div>
              )}
            </div>
          )}

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>
              Work Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder='Describe what you did...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none placeholder-zinc-600'
            />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>
                Hours <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder='e.g. 4'
                min='0'
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>
                Completion % <span className='text-red-500'>*</span>
              </label>
              <input
                type='number'
                value={completion}
                onChange={(e) => setCompletion(e.target.value)}
                placeholder='e.g. 80'
                min='0'
                max='100'
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
              />
            </div>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder='Any blockers or notes...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none placeholder-zinc-600'
            />
          </div>

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <div className='flex gap-3 mt-2'>
            <button
              type='submit'
              disabled={loading || tasks.length === 0}
              className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Submitting...' : 'Submit Work'}
            </button>
            <button
              type='button'
              className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all'
            >
              Save Draft
            </button>
          </div>

        </form>
      </div>

      {/* TASK DETAILS — Desktop only */}
      {!showCards && (
        <div className='w-[280px] flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
          <div className='border-b border-zinc-800 pb-3 mb-3'>
            <h2 className='text-white text-sm font-semibold'>Task details</h2>
          </div>
          {selectedTask ? <TaskDetails /> : <p className='text-zinc-500 text-xs'>No task selected</p>}
        </div>
      )}

    </div>
  )
}

export default SubmitWorkForm