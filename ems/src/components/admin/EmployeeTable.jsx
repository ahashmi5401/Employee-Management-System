import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { ref, onValue } from 'firebase/database'
import ConfirmModal from '../ConfirmModal'
import { deleteEmployee } from '../../utils/deleteEmployee'
import Input from './Input'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const EmployeeTable = ({ onEdit }) => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({})
  const [search, setSearch] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')
  const { isMobile } = useMediaQuery()

  useEffect(() => {
    const empRef = ref(db, 'users')
    const unsub = onValue(empRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const empList = Object.entries(data)
          .filter(([_, val]) => val.role === 'employee')
          .map(([uid, val]) => ({ uid, ...val }))
        setEmployees(empList)
      } else {
        setEmployees([])
      }
      setLoading(false)
    })

    const statusRef = ref(db, 'status')
    const unsubStatus = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val())
      }
    })

    return () => {
      unsub()
      unsubStatus()
    }
  }, [])

  const handleDelete = (uid) => {
    setConfirmAction({ fn: async () => {
      await deleteEmployee(uid)
      setShowConfirm(false)
    }})
    setShowConfirm(true)
  }

  const filteredEmployees = employees
    .filter(emp =>
      emp.name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase()) ||
      emp.designation?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(emp => {
      if (statusFilter === '') return true
      const isOnline = status?.[emp.uid]?.online === true
      if (statusFilter === 'active') return isOnline
      if (statusFilter === 'inactive') return !isOnline
      return true
    })

  if (loading) return <p className='text-zinc-500 text-sm mt-4'>Loading employees...</p>

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <div className='flex flex-col gap-4 mt-4'>

          {/* Search + Filter */}
          <div className='flex gap-2'>
            <Input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search Employees...'
              className='flex-1 bg-zinc-900 py-2.5 px-3 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='bg-zinc-900 py-2.5 px-3 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none'>
              <option value=''>All</option>
              <option value='active'>Active</option>
              <option value='inactive'>Inactive</option>
            </select>
          </div>

          {/* Cards */}
          <div className='flex flex-col gap-3'>
            {filteredEmployees.map(({ uid, name, email, designation, department }) => {
              const isOnline = status?.[uid]?.online === true
              return (
                <div key={uid} className='bg-zinc-900 border border-zinc-800 rounded-2xl p-4'>
                  <div className='flex items-center justify-between mb-3'>
                    <div className='flex items-center gap-3'>
                      <div className='relative'>
                        <div className='w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-semibold'>
                          {name?.charAt(0)}{name?.split(' ')[1]?.charAt(0)}
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full border-2 border-zinc-900 absolute -bottom-0.5 -right-0.5 ${
                          isOnline ? 'bg-green-500' : 'bg-zinc-500'
                        }`} />
                      </div>
                      <div>
                        <p className='text-white text-sm font-medium'>{name}</p>
                        <p className='text-zinc-500 text-xs'>{designation}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isOnline
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                    }`}>
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>

                  <div className='flex flex-col gap-1.5 mb-3'>
                    <div className='flex justify-between'>
                      <span className='text-zinc-500 text-xs'>Email</span>
                      <span className='text-zinc-300 text-xs'>{email}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-zinc-500 text-xs'>Department</span>
                      <span className='text-zinc-300 text-xs'>{department}</span>
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <button
                      onClick={() => onEdit({ uid, name, email, designation, department })}
                      className='flex-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-all'>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(uid)}
                      className='flex-1 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold py-2 rounded-lg hover:bg-red-500/20 transition-all'>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

        {showConfirm && (
          <ConfirmModal
            title="Delete Employee"
            message="Are you sure you want to delete this employee?"
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

  // Desktop/Tablet — table view
  return (
    <>
      <div className='flex flex-col gap-4 mt-4'>

        <div className='flex gap-3'>
          <Input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search Employees...'
            className='flex-1 bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='bg-zinc-900 py-3 px-4 border border-zinc-800 rounded-xl text-zinc-400 text-sm outline-none'>
            <option value=''>All Status</option>
            <option value='active'>Active</option>
            <option value='inactive'>In Active</option>
          </select>
        </div>

        <div className='overflow-x-auto border border-zinc-800 rounded-2xl'>
          <table className='w-full border-collapse min-w-[800px]'>
            <thead>
              <tr className='bg-zinc-950 border-b border-zinc-800'>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[25%]'>Employee</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[20%]'>Email</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[18%]'>Designation</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[15%]'>Department</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]'>Status</th>
                <th className='px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(({ uid, name, email, designation, department }) => {
                const isOnline = status?.[uid]?.online === true
                return (
                  <tr key={uid} className='border-b border-zinc-800 hover:bg-zinc-800/50 transition-all'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <div className='relative'>
                          <div className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0'>
                            {name?.charAt(0)}{name?.split(' ')[1]?.charAt(0)}
                          </div>
                          <div className={`w-2.5 h-2.5 rounded-full border-2 border-zinc-950 absolute -bottom-0.5 -right-0.5 ${
                            isOnline ? 'bg-green-500' : 'bg-zinc-500'
                          }`} />
                        </div>
                        <span className='text-white text-sm font-medium'>{name}</span>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-zinc-400 text-sm'>{email}</td>
                    <td className='px-4 py-3 text-zinc-400 text-sm'>{designation}</td>
                    <td className='px-4 py-3 text-zinc-400 text-sm'>{department}</td>
                    <td className='px-4 py-3'>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        isOnline
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                      }`}>
                        {isOnline ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <button
                          onClick={() => onEdit({ uid, name, email, designation, department })}
                          className='bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-blue-500/20 transition-all'>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(uid)}
                          className='bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-3 py-1 rounded-lg hover:bg-red-500/20 transition-all'>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete Employee"
          message="Are you sure you want to delete this employee? This action cannot be undone."
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

export default EmployeeTable