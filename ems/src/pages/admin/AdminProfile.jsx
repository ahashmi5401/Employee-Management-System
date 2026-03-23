import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Navbar from '../../components/admin/Navbar'
import { auth, db } from '../../firebase'
import { ref, update } from 'firebase/database'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { useUserProfile } from '../../hooks/useUserProfile'

const AdminProfile = () => {
  const { profile } = useUserProfile()
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [nameLoading, setNameLoading] = useState(false)
  const [passLoading, setPassLoading] = useState(false)
  const [nameSuccess, setNameSuccess] = useState(false)
  const [passSuccess, setPassSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (profile) {
      setName(profile.name || '')
      setDesignation(profile.designation || '')
    }
  }, [profile])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    if (!name) return
    setNameLoading(true)
    setError('')
    try {
      const user = auth.currentUser
      await update(ref(db, `users/${user.uid}`), { name, designation })
      setNameSuccess(true)
      setTimeout(() => setNameSuccess(false), 3000)
    } catch (err) {
      setError(err.message)
    }
    setNameLoading(false)
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if (!currentPassword || !newPassword) return
    setPassLoading(true)
    setError('')
    try {
      const user = auth.currentUser
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      await updatePassword(user, newPassword)
      setPassSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
      setTimeout(() => setPassSuccess(false), 3000)
    } catch (err) {
      setError('Current password is incorrect')
    }
    setPassLoading(false)
  }

  return (
    <div className='flex h-screen bg-zinc-950 overflow-hidden'>
      <Sidebar />
      <div className='flex flex-col flex-1 min-w-0'>
        <Navbar title="Profile" subTitle="Manage your account" />
        <main className='flex-1 overflow-y-auto p-4 md:p-6'>
          <div className='max-w-2xl mx-auto flex flex-col gap-4'>

            {/* Profile Info */}
            <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
              <div className='border-b border-zinc-800 pb-3 mb-4'>
                <h2 className='text-white text-sm font-semibold'>Profile Info</h2>
                <span className='text-zinc-500 text-xs'>Update your name and designation</span>
              </div>

              {/* Avatar */}
              <div className='flex items-center gap-4 mb-4 pb-4 border-b border-zinc-800'>
                <div className='w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center text-white text-xl font-bold'>
                  {profile?.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className='text-white text-sm font-semibold'>{profile?.name || 'Admin'}</p>
                  <p className='text-zinc-500 text-xs'>{profile?.email}</p>
                  <span className='bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold px-2 py-0.5 rounded-full capitalize'>
                    {profile?.role}
                  </span>
                </div>
              </div>

              {nameSuccess && (
                <div className='bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 mb-3'>
                  <p className='text-green-400 text-xs font-medium'>✓ Profile updated!</p>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Designation</label>
                  <input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder='e.g. HR Manager'
                    className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Email</label>
                  <input
                    value={profile?.email || ''}
                    disabled
                    className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-600 text-sm outline-none cursor-not-allowed'
                  />
                </div>
                <button
                  type='submit'
                  disabled={nameLoading}
                  className='bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'
                >
                  {nameLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
              <div className='border-b border-zinc-800 pb-3 mb-4'>
                <h2 className='text-white text-sm font-semibold'>Change Password</h2>
                <span className='text-zinc-500 text-xs'>Security settings</span>
              </div>

              {passSuccess && (
                <div className='bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2.5 mb-3'>
                  <p className='text-green-400 text-xs font-medium'>✓ Password updated!</p>
                </div>
              )}

              {error && (
                <div className='bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 mb-3'>
                  <p className='text-red-400 text-xs font-medium'>{error}</p>
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>Current Password</label>
                  <input
                    type='password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder='••••••••'
                    className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                  />
                </div>
                <div className='flex flex-col gap-1.5'>
                  <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>New Password</label>
                  <input
                    type='password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='••••••••'
                    className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                  />
                </div>
                <button
                  type='submit'
                  disabled={passLoading}
                  className='bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'
                >
                  {passLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminProfile