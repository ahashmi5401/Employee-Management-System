import React, { useState } from 'react'
import logout from '../../utils/logout'

const UpdatePassword = () => {
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!current || !newPass) {
      alert('Please fill all fields')
      return
    }
    console.log({ current, newPass })
  }

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 p-5'>

      {/* Header */}
      <div className='border-b border-zinc-800 pb-3 mb-4'>
        <h2 className='text-white text-sm font-semibold'>Change password</h2>
        <span className='text-zinc-500 text-xs'>Security settings</span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>

        <div className='flex flex-col gap-1.5'>
          <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>
            Current password
          </label>
          <input
            type='password'
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder='••••••••'
            className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>
            New password
          </label>
          <input
            type='password'
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            placeholder='••••••••'
            className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 mt-2'
        >
          Update password
        </button>

        <button
          type='button'
          onClick={logout}
          className='w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-sm font-semibold py-3 rounded-xl transition-all duration-200'
        >
          Sign out
        </button>

      </form>
    </div>
  )
}

export default UpdatePassword