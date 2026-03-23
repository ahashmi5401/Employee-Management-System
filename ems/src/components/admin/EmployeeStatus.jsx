import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { ref, onValue } from 'firebase/database'

const EmployeeStatus = () => {
  const [employees, setEmployees] = useState([])
  const [status, setStatus] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Employees fetch
    const empRef = ref(db, 'users')
    const unsubEmp = onValue(empRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const empList = Object.entries(data)
          .filter(([_, val]) => val.role === 'employee')
          .map(([uid, val]) => ({ uid, ...val }))
        setEmployees(empList)
      }
      setLoading(false)
    })

    // Status fetch
    const statusRef = ref(db, 'status')
    const unsubStatus = onValue(statusRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val())
      }
    })

    return () => {
      unsubEmp()
      unsubStatus()
    }
  }, [])

  const getInitials = (name) => {
    if (!name) return 'NA'
    const parts = name.split(' ')
    return parts[0]?.charAt(0) + (parts[1]?.charAt(0) || '')
  }

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500']

  if (loading) return <p className='text-zinc-500 text-sm'>Loading...</p>

  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-2xl flex-1 flex flex-col max-h-[320px]'>

      <div className="flex justify-between px-4 py-3 items-center border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <h2 className="text-white text-sm font-semibold">Employees</h2>
        <span className="text-zinc-500 text-xs">{employees.length} total</span>
      </div>

      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {employees.map(({ uid, name, designation }, index) => {
          const isOnline = status[uid]?.online === true
          return (
            <div key={uid} className="flex justify-between bg-zinc-950 rounded-xl px-3 py-3 items-center">
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <div className={`rounded-full ${colors[index % colors.length]} h-9 w-9 flex items-center justify-center text-white text-xs font-semibold`}>
                    {getInitials(name)}
                  </div>
                  {/* Online indicator */}
                  <div className={`w-2.5 h-2.5 rounded-full border-2 border-zinc-950 absolute -bottom-0.5 -right-0.5 ${
                    isOnline ? 'bg-green-500' : 'bg-zinc-500'
                  }`} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{name}</p>
                  <span className="text-zinc-500 text-xs">{designation}</span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                isOnline
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
              }`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default EmployeeStatus