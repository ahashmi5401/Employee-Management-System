import React, { useState } from 'react'
import { rejectSubmission } from '../../utils/updateSubmission'

const RejectModal = ({ submissionId, onClose, onSuccess }) => {
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleReject = async () => {
    if (!note) {
      setError('Please add a note for rejection')
      return
    }
    setLoading(true)
    const result = await rejectSubmission(submissionId, note)
    if (result.success) {
      onSuccess()
      onClose()
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className='fixed px-4 inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md'>

        {/* Header */}
        <div className='flex justify-between items-center mb-5 pb-4 border-b border-zinc-800'>
          <div>
            <h2 className='text-white text-sm font-semibold'>Reject Submission</h2>
            <p className='text-zinc-500 text-xs mt-0.5'>Add feedback for employee</p>
          </div>
          <button onClick={onClose} className='text-zinc-500 hover:text-white transition-all'>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="1" y1="1" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="1" x2="1" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-500 text-xs font-semibold tracking-widest uppercase'>
              Rejection Note <span className='text-red-500'>*</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              placeholder='Tell employee what needs to be fixed...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none placeholder-zinc-600'
            />
          </div>

          {error && <p className='text-red-500 text-xs'>{error}</p>}

          <div className='flex gap-3'>
            <button
              onClick={handleReject}
              disabled={loading}
              className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all disabled:opacity-50'
            >
              {loading ? 'Rejecting...' : 'Reject & Send Note'}
            </button>
            <button
              onClick={onClose}
              className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all'
            >
              Cancel
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RejectModal