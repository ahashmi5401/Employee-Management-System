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
        <main className='flex-1 overflow-y-auto p-4 md:p-6 scrollBar'>
           <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-zinc-100">My Profile</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar Card */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-red-900/30 mb-4">
                {profile?.name?.charAt(0) || 'A'}
              </div>
              <h2 className="text-lg font-semibold text-zinc-100">{profile?.name || 'Admin'}</h2>
              <p className="text-zinc-500 text-sm mt-0.5">{profile?.email}</p>
              <span className="mt-3 inline-block bg-red-600/15 text-red-500 text-xs font-medium px-3 py-1 rounded-full border border-red-600/20">
                {profile?.role}
              </span>

              <div className="w-full mt-6 pt-6 border-t border-zinc-800 space-y-3 text-left">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium">Designation</p>
                  <p className="text-sm text-zinc-300 mt-0.5">{profile?.designation || '—'}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium">Email</p>
                  <p className="text-sm text-zinc-300 mt-0.5">{profile?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Info */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">Profile Info</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">Update your name and designation</p>
                </div>
                {nameSuccess && (
                  <span className="text-green-500 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full">
                    ✓ Profile updated!
                  </span>
                )}
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-medium">Full Name</label>
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-medium">Designation</label>
                    <input
                      type='text'
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder='e.g. HR Manager'
                      className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-sm mb-2 font-medium">Email</label>
                  <input
                    type='email'
                    value={profile?.email}
                    disabled
                    className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-500 text-sm outline-none cursor-not-allowed opacity-60'
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type='submit'
                    disabled={nameLoading}
                    className='bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all disabled:opacity-50'
                  >
                    {nameLoading ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-100">Change Password</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">Security settings</p>
                </div>
                {passSuccess && (
                  <span className="text-green-500 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full">
                    ✓ Password updated!
                  </span>
                )}
              </div>

              {error && (
                <div className="mb-5 bg-red-600/10 border border-red-600/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleUpdatePassword} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-medium">Current Password</label>
                    <input
                      type='password'
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder='••••••••'
                      className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2 font-medium">New Password</label>
                    <input
                      type='password'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder='••••••••'
                      className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type='submit'
                    disabled={passLoading}
                    className='bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-all disabled:opacity-50'
                  >
                    {passLoading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
        </main>
      </div>
    </div>
  )
}

export default AdminProfile