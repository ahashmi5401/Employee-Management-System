import React, { useState, useEffect } from 'react'
import { createTask } from '../../utils/createTask'
import { db } from '../../firebase'
import { ref, get } from 'firebase/database'

const AddTaskModal = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [assignedToName, setAssignedToName] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [dueDate, setDueDate] = useState('')
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch employees from Firebase
useEffect(() => {
  const fetchEmployees = async () => {
    const snapshot = await get(ref(db, 'users'))
    if (snapshot.exists()) {
      const data = snapshot.val()
      const empList = Object.entries(data)
        .filter(([_, val]) => val.role === 'employee')
        .map(([uid, val]) => ({ uid, ...val }))
      setEmployees(empList)

      // ← Pehla employee default set karo
      if (empList.length > 0) {
        setAssignedTo(empList[0].uid)
        setAssignedToName(empList[0].name)
      }
    }
  }
  fetchEmployees()
}, [])

  const handleEmployeeChange = (e) => {
    const uid = e.target.value
    const emp = employees.find(e => e.uid === uid)
    setAssignedTo(uid)
    setAssignedToName(emp?.name || '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !desc || !assignedTo || !dueDate) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    setError('')

    const result = await createTask(
      title, desc, assignedTo,
      assignedToName, priority, dueDate
    )

    if (result.success) {
      onSuccess()
      onClose()
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md'>

        {/* Header */}
        <div className='flex justify-between items-center mb-5 pb-4 border-b border-zinc-800'>
          <div>
            <h2 className='text-white text-sm font-semibold'>Assign Task</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>Assign a new task to employee</p>
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
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Task Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Fix Login Bug'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder='Describe the task...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600 resize-none'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Assign To</label>
            <select
              value={assignedTo}
              onChange={handleEmployeeChange}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
            >
              <option value=''>Select employee</option>
              {employees.map((emp) => (
                <option key={emp.uid} value={emp.uid}>{emp.name}</option>
              ))}
            </select>
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

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <div className='flex gap-3 mt-2'>
            <button
              type='submit'
              disabled={loading}
              className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'
            >
              {loading ? 'Assigning...' : 'Assign Task'}
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

export default AddTaskModal