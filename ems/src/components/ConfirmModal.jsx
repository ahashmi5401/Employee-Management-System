import React from 'react'

const ConfirmModal = ({ title, message, onConfirm, onCancel, confirmText = 'Yes', cancelText = 'Cancel', type = 'danger' }) => {
  const confirmStyle = type === 'danger'
    ? 'bg-red-600 hover:bg-red-500 text-white'
    : 'bg-green-600 hover:bg-green-500 text-white'

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
      <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-sm'>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
          type === 'danger' ? 'bg-red-500/10' : 'bg-green-500/10'
        }`}>
          {type === 'danger' ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" stroke="#ef4444" strokeWidth="1.5"/>
              <line x1="11" y1="7" x2="11" y2="12" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="11" cy="15" r="0.8" fill="#ef4444"/>
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="11" cy="11" r="9" stroke="#22c55e" strokeWidth="1.5"/>
              <polyline points="7,11 10,14 15,8" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>

        {/* Title */}
        <h2 className='text-white text-sm font-semibold text-center mb-2'>{title}</h2>
        <p className='text-zinc-500 text-xs text-center leading-relaxed mb-6'>{message}</p>

        {/* Buttons */}
        <div className='flex gap-3'>
          <button
            onClick={onCancel}
            className='flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all'
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 ${confirmStyle} active:scale-95 text-sm font-semibold py-3 rounded-xl transition-all`}
          >
            {confirmText}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal