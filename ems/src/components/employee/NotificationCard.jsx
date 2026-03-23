import React from 'react'
import { useNotifications } from '../../hooks/useNotification'

const NotificationCard = () => {
  const { notifications } = useNotifications()

const dotColor = (type) => {
  if (type === 'approved') return 'bg-green-500'
  if (type === 'rejected') return 'bg-red-500'
  if (type === 'deleted')  return 'bg-zinc-500'
  return 'bg-blue-500'
}

  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (mins > 0) return `${mins}m ago`
    return 'Just now'
  }

  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl flex-1 flex flex-col max-h-[320px]'>

      {/* Header */}
      <div className="flex px-4 py-3 items-center justify-between border-b border-zinc-800 sticky top-0 bg-zinc-900 rounded-t-2xl z-10">
        <div>
          <p className='text-white text-sm font-semibold'>Notifications</p>
          <span className='text-zinc-500 text-xs'>
            {notifications.filter(n => !n.read).length} unread
          </span>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 px-3 py-3 overflow-y-auto scrollBar">
        {notifications.length === 0 ? (
          <p className='text-zinc-500 text-xs px-1'>No notifications yet.</p>
        ) : (
          notifications.map(({ id, message, type, read, createdAt }) => (
            <div
              key={id}
              className={`flex items-start gap-3 rounded-xl px-3 py-3 ${
                read ? 'bg-zinc-950' : 'bg-zinc-800/50'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${dotColor(type)} mt-1.5 flex-shrink-0`} />
              <div className='flex-1'>
                <p className='text-zinc-300 text-xs leading-relaxed'>{message}</p>
                <span className='text-zinc-600 text-xs mt-1 block'>{timeAgo(createdAt)}</span>
              </div>
              {!read && (
                <div className='w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0' />
              )}
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default NotificationCard