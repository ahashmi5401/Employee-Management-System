import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { ref, onValue } from 'firebase/database'
import { NavLink } from 'react-router-dom'

const TaskSubmissionStatus = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subRef = ref(db, 'submissions')
    const unsub = onValue(subRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const subList = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .slice(0, 6)
        setSubmissions(subList)
      } else {
        setSubmissions([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const statusStyle = (status) => {
    if (status === 'Approved') return 'bg-green-500/10 text-green-400 border border-green-500/20'
    if (status === 'Rejected') return 'bg-red-500/10 text-red-400 border border-red-500/20'
    return 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
  }

  const borderLeft = (status) => {
    if (status === 'Approved') return 'border-l-4 border-green-500'
    if (status === 'Rejected') return 'border-l-4 border-red-500'
    return 'border-l-4 border-amber-500'
  }

  if (loading) return <p className='text-zinc-500 text-sm'>Loading...</p>

  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-2xl flex-1 flex flex-col max-h-[320px]'>

      <div className="flex justify-between px-4 py-3 items-center border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <h2 className="text-white text-sm font-semibold">Recent Submissions</h2>
        <NavLink to='/admin/submissions' className="text-red-500 hover:text-red-400 text-xs font-medium transition-all">
          View all →
        </NavLink>
      </div>

      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {submissions.length === 0 ? (
          <p className='text-zinc-500 text-xs px-1'>No submissions yet.</p>
        ) : (
          submissions.map(({ id, taskTitle, employeeName, status, submittedAt }) => (
            <div key={id} className={`bg-zinc-950 rounded-xl px-3 py-3 ${borderLeft(status)}`}>
              <div className="flex justify-between items-center">
                <p className="text-white text-sm font-medium">{taskTitle}</p>
                <span className={`${statusStyle(status)} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-zinc-500 text-xs">{employeeName}</span>
                <span className="text-zinc-700 text-xs">·</span>
                <span className="text-zinc-600 text-xs">
                  {submittedAt ? new Date(submittedAt).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default TaskSubmissionStatus