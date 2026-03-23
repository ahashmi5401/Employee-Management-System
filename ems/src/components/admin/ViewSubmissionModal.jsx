import React from 'react'

const ViewSubmissionModal = ({ submission, onClose }) => {
  const statusStyle = (status) => {
    if (status === "Approved") return "bg-green-500/10 text-green-400 border border-green-500/20"
    if (status === "Rejected") return "bg-red-500/10 text-red-400 border border-red-500/20"
    return "bg-amber-500/10 text-amber-400 border border-amber-500/20"
  }

  return (
    <div className='fixed px-4 inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg'>

        {/* Header */}
        <div className='flex justify-between items-center mb-5 pb-4 border-b border-zinc-800'>
          <div>
            <h2 className='text-white text-sm font-semibold'>Submission Details</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>View employee work submission</p>
          </div>
          <button onClick={onClose} className='text-zinc-500 hover:text-white transition-all'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-0'>

          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Employee</span>
            <span className='text-white text-xs font-medium'>{submission.employeeName}</span>
          </div>

          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Task</span>
            <span className='text-white text-xs font-medium'>{submission.taskTitle}</span>
          </div>

          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Hours Spent</span>
            <span className='text-white text-xs'>{submission.hoursSpent} hrs</span>
          </div>

          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Completion</span>
            <span className='text-white text-xs'>{submission.completion}%</span>
          </div>

          <div className='flex justify-between items-center py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Status</span>
            <span className={`${statusStyle(submission.status)} text-xs font-semibold px-3 py-1 rounded-full`}>
              {submission.status}
            </span>
          </div>

          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Submitted</span>
            <span className='text-white text-xs'>
              {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : '—'}
            </span>
          </div>

          <div className='py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Description</span>
            <p className='text-zinc-300 text-xs mt-1.5 leading-relaxed'>{submission.description || '—'}</p>
          </div>

          <div className='py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Notes</span>
            <p className='text-zinc-300 text-xs mt-1.5 leading-relaxed'>{submission.notes || '—'}</p>
          </div>

          {submission.adminNote && (
            <div className='py-2.5'>
              <span className='text-zinc-500 text-xs'>Admin Note</span>
              <p className='text-red-400 text-xs mt-1.5 leading-relaxed'>{submission.adminNote}</p>
            </div>
          )}

        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className='w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all mt-4'>
          Close
        </button>

      </div>
    </div>
  )
}

export default ViewSubmissionModal