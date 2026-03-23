import React from 'react'
import { useUserProfile } from '../../hooks/useUserProfile'

const InfoCard = () => {
  const { profile, loading } = useUserProfile()

  const getInitials = (name) => {
    if (!name) return 'NA'
    const parts = name.split(' ')
    return parts[0]?.charAt(0) + (parts[1]?.charAt(0) || '')
  }

  if (loading) return <p className='text-zinc-500 text-sm p-4'>Loading...</p>

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1'>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {getInitials(profile?.name)}
          </div>
          <div>
            <h2 className='text-white text-sm font-semibold'>{profile?.name}</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>{profile?.designation}</p>
            <p className='text-zinc-600 text-xs font-mono'>{profile?.uid?.slice(0, 8).toUpperCase()}</p>
          </div>
        </div>
        <button className='bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-700 transition-all cursor-not-allowed'>
          Edit
        </button>
      </div>

      {/* Info rows */}
      <div className="flex flex-col px-5">
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Email</span>
          <span className='text-zinc-300 text-xs'>{profile?.email}</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Department</span>
          <span className='text-zinc-300 text-xs'>{profile?.department}</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-zinc-800">
          <span className='text-zinc-500 text-xs'>Designation</span>
          <span className='text-zinc-300 text-xs'>{profile?.designation}</span>
        </div>
        <div className="flex justify-between items-center py-2.5">
          <span className='text-zinc-500 text-xs'>Status</span>
          <span className='bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-semibold px-2.5 py-0.5 rounded-full'>
            Active
          </span>
        </div>
      </div>

    </div>
  )
}

export default InfoCard