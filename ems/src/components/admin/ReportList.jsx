import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { ref, onValue } from 'firebase/database'

const ReportList = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const refReport = ref(db, "reports")
    const unsub = onValue(refReport, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const reportData = Object.entries(data)
          .map(([id, val]) => ({ id, ...val }))
          .filter(r => r.type)  // placeholder hata do
          .reverse()  // ← () missing tha — function call nahi ho raha tha
        setReports(reportData)
      } else {
        setReports([])
      }
      setLoading(false)  // ← missing tha
    })
    return () => unsub()  // ← () => missing tha — render pe hi unsub ho raha tha
  }, [])

  const borderLeft = (type) => {
    if (type === 'Task') return 'border-l-4 border-green-500'
    if (type === 'Employee') return 'border-l-4 border-blue-500'
    return 'border-l-4 border-purple-500'
  }

  if (loading) return <p className='text-zinc-500 text-sm p-4'>Loading...</p>

  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-2xl flex flex-col max-h-[400px]'>

      <div className="flex justify-between px-4 py-3 items-center border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <h2 className="text-white text-sm font-semibold">Recent Reports</h2>
        <span className="text-red-500 text-xs font-medium cursor-pointer hover:text-red-400 transition-all">View all</span>
      </div>

      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {reports.length === 0 ? (
          <p className='text-zinc-500 text-xs px-1'>No reports generated yet.</p>
        ) : (
          reports.map(({ id, type, dateFrom, dateTo, totalRecords, employeeName, generatedAt }) => (
            <div key={id} className={`bg-zinc-950 rounded-xl px-3 py-3 ${borderLeft(type)} flex justify-between items-center`}>
              <div className="flex flex-col gap-0.5">
                <p className="text-white text-sm font-medium">{type} Report</p>
                <span className="text-zinc-500 text-xs">{dateFrom} — {dateTo} · {totalRecords} records</span>
                <span className="text-zinc-600 text-xs">{employeeName} · {new Date(generatedAt).toLocaleDateString()}</span>
              </div>
              <button className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-500/20 active:scale-95 transition-all duration-200 flex items-center gap-1.5 flex-shrink-0">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <line x1="5.5" y1="1" x2="5.5" y2="7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  <polyline points="2.5,5.5 5.5,8.5 8.5,5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1.5" y1="10" x2="9.5" y2="10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Download
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default ReportList