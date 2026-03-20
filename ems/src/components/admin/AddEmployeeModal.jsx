import React, { useState } from 'react'
import { createEmployee } from '../../utils/createEmployee'
import { auth } from '../../firebase'

const AddEmployeeModal = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [designation, setDesignation] = useState('')
  const [department, setDepartment] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !designation || !department || !adminPassword) {
      setError('Please fill all fields')
      return
    }
    setLoading(true)
    setError('')

    const adminEmail = auth.currentUser.email

    const result = await createEmployee(
      name, email, password,
      designation, department,
      adminEmail, adminPassword
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
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md'>

        {/* Header */}
        <div className='flex justify-between items-center mb-5 pb-4 border-b border-zinc-800'>
          <div>
            <h2 className='text-white text-sm font-semibold'>Add Employee</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>Create new employee account</p>
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
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Muhammad Ayan Hashmi' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Email</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ayan@smart-ems.com' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='••••••••' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Designation</label>
              <input value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder='Frontend Developer' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Department</label>
              <input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder='Engineering' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
            </div>
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Your Password (to stay logged in)</label>
            <input type='password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder='••••••••' className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'/>
          </div>

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <div className='flex gap-3 mt-2'>
            <button type='submit' disabled={loading} className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'>
              {loading ? 'Creating...' : 'Add Employee'}
            </button>
            <button type='button' onClick={onClose} className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all'>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddEmployeeModal