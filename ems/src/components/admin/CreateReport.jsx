const CreateReport = () => {
  return (
    <div className='border border-zinc-800 bg-zinc-900 rounded-2xl flex flex-col max-h-[420px] overflow-y-auto scrollBar'>

      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 sticky top-0 bg-zinc-900 z-10">
        <h2 className="text-white text-sm font-semibold">Generate New Report</h2>
        <span className="text-zinc-500 text-xs">Export data as PDF</span>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 px-4 py-4">

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Report Type</label>
          <select className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm outline-none focus:border-red-600 transition-all">
            <option value="">Select report type</option>
            <option value="task">Task Report</option>
            <option value="employee">Employee Report</option>
            <option value="submission">Submission Report</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">From Date</label>
          <input type="date" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm outline-none focus:border-red-600 transition-all"/>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">To Date</label>
          <input type="date" className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm outline-none focus:border-red-600 transition-all"/>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-xs font-semibold tracking-widest uppercase">Employee (optional)</label>
          <select className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 text-sm outline-none focus:border-red-600 transition-all">
            <option value="">All employees</option>
            <option value="ayan">Muhammad Ayan Hashmi</option>
            <option value="sara">Sara Raza</option>
            <option value="hassan">M. Hassan</option>
            <option value="zara">Zara Ahmed</option>
            <option value="omar">Omar Khan</option>
          </select>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <line x1="6.5" y1="1" x2="6.5" y2="9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
            <polyline points="3,6.5 6.5,10 10,6.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="1.5" y1="12" x2="11.5" y2="12" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          Generate & Download PDF
        </button>

        <button className="w-full bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all duration-200">
          Export as CSV
        </button>

      </div>
    </div>
  )
}

export default CreateReport