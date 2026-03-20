const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-4 py-5 border-b border-zinc-800">
      
      <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <circle cx="6" cy="5" r="2.5" fill="white"/>
          <path d="M2 13c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="6" x2="14" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="11" y1="9" x2="14" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div>
        <div className="text-white text-sm font-bold tracking-tight">
          Smart<span className="text-red-500">EMS</span>
        </div>
        <div className="text-zinc-600 text-[9px] tracking-widest uppercase">
          Employee System
        </div>
      </div>

    </div>
  )
}

export default Logo