import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import Navbar from '../../components/admin/Navbar'
import { auth, db } from '../../firebase'
import { ref, update } from 'firebase/database'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { useUserProfile } from '../../hooks/useUserProfile'

const AdminProfile = () => {
  const { profile } = useUserProfile()
  const fileInputRef = useRef(null)
  
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
  const [nameLoading, setNameLoading] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
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

  // Custom Camera SVG Component
  const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  )

  // Custom Spinner SVG Component
  const LoadingSpinner = () => (
    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Limit to 1MB because Realtime DB stores strings
    if (file.size > 1024 * 1024) {
      setError("Image size should be less than 1MB")
      return
    }

    setImageLoading(true)
    const reader = new FileReader()
    
    reader.onloadend = async () => {
      try {
        const base64String = reader.result
        const user = auth.currentUser
        
        // Update Realtime DB Directly
        await update(ref(db, `users/${user.uid}`), { image: base64String })
        
        setNameSuccess(true)
        setTimeout(() => setNameSuccess(false), 3000)
      } catch (err) {
        setError("Update failed: " + err.message)
      } finally {
        setImageLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

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
            
            {error && (
              <div className="mb-6 bg-red-600/10 border border-red-600/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Avatar Card */}
              <div className="lg:col-span-1">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                  />

                  {/* Avatar Circle */}
                  <div 
                    onClick={handleImageClick}
                    className="relative w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-red-900/30 mb-4 cursor-pointer group overflow-hidden border-2 border-zinc-800 hover:border-red-500 transition-all"
                  >
                    {imageLoading ? (
                       <LoadingSpinner />
                    ) : profile?.image ? (
                      <img src={profile.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>{profile?.name?.charAt(0).toUpperCase() || 'A'}</span>
                    )}

                    {/* Camera Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <CameraIcon />
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-zinc-100">{profile?.name || 'Admin'}</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">{profile?.email}</p>
                  <span className="mt-3 inline-block bg-red-600/15 text-red-500 text-xs font-medium px-3 py-1 rounded-full border border-red-600/20">
                    {profile?.role || 'User'}
                  </span>

                  <div className="w-full mt-6 pt-6 border-t border-zinc-800 space-y-3 text-left">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium">Designation</p>
                      <p className="text-sm text-zinc-300 mt-0.5">{profile?.designation || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Profile Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-zinc-100">Profile Info</h2>
                    {nameSuccess && <span className="text-green-500 text-xs font-medium bg-green-500/10 px-2 py-1 rounded">✓ Updated</span>}
                  </div>

                  <form onSubmit={handleUpdateProfile} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-zinc-400 text-sm mb-2">Full Name</label>
                        <input
                          type='text'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 text-sm mb-2">Designation</label>
                        <input
                          type='text'
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button disabled={nameLoading} className='bg-red-600 hover:bg-red-700 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-50'>
                        {nameLoading ? 'Saving...' : 'Update Profile'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Password Form */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8">
                   <h2 className="text-lg font-semibold text-zinc-100 mb-6">Security Settings</h2>
                   <form onSubmit={handleUpdatePassword} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <input 
                          type="password" 
                          placeholder="Current Password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                        />
                        <input 
                          type="password" 
                          placeholder="New Password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className='w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
                        />
                      </div>
                      <div className="flex justify-end">
                        <button disabled={passLoading} className='bg-zinc-800 hover:bg-zinc-700 px-6 py-2.5 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-50'>
                          {passLoading ? 'Updating...' : 'Change Password'}
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