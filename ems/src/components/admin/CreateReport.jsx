import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'
import { ref, onValue } from 'firebase/database'
import { generateReport } from '../../utils/generateReport'

const CreateReport = () => {
  const [type, setType] = useState('Task')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState('')
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  // Employees fetch karo
  useEffect(() => {
    const empRef = ref(db, 'users')
    onValue(empRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const empList = Object.entries(data)
          .filter(([_, val]) => val.role === 'employee')
          .map(([uid, val]) => ({ uid, ...val }))
        setEmployees(empList)
      }
    })
  }, [])

  const handleGenerate = async () => {
    if (!fromDate || !toDate) {
      alert('Please select date range')
      return
    }

    setLoading(true)

    // Firebase se data fetch karo
    const nodeMap = {
      'Task': 'tasks',
      'Employee': 'users',
      'Submission': 'submissions',
    }

    const dataRef = ref(db, nodeMap[type])
    onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        let data = Object.values(snapshot.val())

        // Employee filter
        if (selectedEmployee) {
          data = data.filter(item =>
            item.assignedTo === selectedEmployee ||
            item.employeeId === selectedEmployee
          )
        }

        // Employee name
        const emp = employees.find(e => e.uid === selectedEmployee)
        const empName = emp ? emp.name : 'All Employees'

        generateReport(type, data, { from: fromDate, to: toDate }, empName)
      }
      setLoading(false)
    }, { onlyOnce: true })
  }

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col max-h-[420px] overflow-y-auto scrollBar'>

      <div className="px-4 py-3 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
        <h2 className="text-white text-sm font-semibold">Generate New Report</h2>
        <span className="text-zinc-500 text-xs">Export data as PDF</span>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4">

        {/* Report Type */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Report Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all"
          >
            <option value="Task">Task Report</option>
            <option value="Employee">Employee Report</option>
            <option value="Submission">Submission Report</option>
          </select>
        </div>

        {/* From Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all"
          />
        </div>

        {/* Employee */}
        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Employee (optional)</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all"
          >
            <option value="">All Employees</option>
            {employees.map(emp => (
              <option key={emp.uid} value={emp.uid}>{emp.name}</option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <line x1="6.5" y1="1" x2="6.5" y2="9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
            <polyline points="3,6.5 6.5,10 10,6.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="1.5" y1="12" x2="11.5" y2="12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {loading ? 'Generating...' : 'Generate & Download PDF'}
        </button>

      </div>
    </div>
  )
}

export default CreateReport