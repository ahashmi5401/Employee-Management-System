import React, { useEffect, useState } from "react"
import { auth, db } from '../../firebase'
import { ref, onValue } from "firebase/database"
import { useMediaQuery } from "../../hooks/useMediaQuery"

const HistoryTable = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const { isMobile, isTablet } = useMediaQuery()
  const showCards = isMobile || isTablet

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const subRef = ref(db, "submissions")
    const unsub = onValue(subRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const mySubmissions = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter(s => s.employeeId === currentUser.uid)
        setSubmissions(mySubmissions)
      } else {
        setSubmissions([])
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-green-500/10 text-green-400 border border-green-500/20"
    if (status === "Rejected") return "bg-red-500/10 text-red-400 border border-red-500/20"
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
  }

  if (loading) return <p className="text-zinc-500 text-sm mt-4">Loading...</p>
  if (submissions.length === 0) return <p className="text-zinc-500 text-sm mt-4">No submissions yet.</p>

  return (
    <>
      {/* Mobile + Tablet — Card View */}
      {showCards ? (
        <div className="flex flex-col gap-3">
          {submissions.map(({ id, taskTitle, submittedAt, hoursSpent, status, adminNote, description }) => (
            <div key={id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">

              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 mr-2">
                  <p className="text-white text-sm font-medium">{taskTitle}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{description}</p>
                </div>
                <span className={`${statusStyle(status)} text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0`}>
                  {status}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mb-3">
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-xs">Submitted</span>
                  <span className="text-zinc-300 text-xs">
                    {submittedAt ? new Date(submittedAt).toLocaleDateString() : '—'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-xs">Hours</span>
                  <span className="text-zinc-300 text-xs">{hoursSpent} hrs</span>
                </div>
              </div>

              {adminNote && (
                <div className="bg-zinc-950 rounded-xl px-3 py-2.5 border-l-4 border-zinc-700">
                  <p className="text-zinc-500 text-xs font-semibold mb-1">Admin Note</p>
                  <p className="text-zinc-400 text-xs leading-relaxed">{adminNote}</p>
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        // Desktop — Table View
        <div className="overflow-x-auto border border-zinc-800 rounded-2xl">
          <table className="w-full border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800">
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[25%]">Task</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[14%]">Submitted</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[10%]">Hours</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[12%]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold tracking-widest uppercase text-zinc-500 w-[39%]">Admin Note</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(({ id, taskTitle, submittedAt, hoursSpent, status, adminNote, description }) => (
                <tr key={id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-all">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium">{taskTitle}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{description}</p>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-sm">
                    {submittedAt ? new Date(submittedAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-sm font-medium">
                    {hoursSpent} hrs
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${statusStyle(status)} text-xs font-semibold px-3 py-1 rounded-full`}>
                      {status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500 text-xs leading-relaxed">
                    {adminNote || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default HistoryTable