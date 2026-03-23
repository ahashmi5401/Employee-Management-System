import React, { useState } from 'react'
import { editTask } from '../../utils/editTask'

const EditTaskModal = ({ task, onClose, onSuccess }) => {
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.desc)
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [status, setStatus] = useState(task.status)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !desc || !dueDate) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    const result = await editTask(task.id, {
      title, desc, priority, dueDate, status
    })
    if (result.success) {
      onSuccess()
      onClose()
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className='fixed px-4 inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md'>

        {/* Header */}
        <div className='flex justify-between items-center mb-5 pb-4 border-b border-zinc-800'>
          <div>
            <h2 className='text-white text-sm font-semibold'>Edit Task</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>Update task details</p>
          </div>
          <button onClick={onClose} className='text-zinc-500 hover:text-white transition-all'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none'
            />
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
              >
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
              </select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Due Date</label>
              <input
                type='date'
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
              />
            </div>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
            >
              <option value='Pending'>Pending</option>
              <option value='Completed'>Completed</option>
              <option value='Failed'>Failed</option>
            </select>
          </div>

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <div className='flex gap-3 mt-2'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'
            >
              {loading ? 'Updating...' : 'Update Task'}
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all'
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditTaskModal