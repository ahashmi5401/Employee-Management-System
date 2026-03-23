import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { ref, onValue, update } from 'firebase/database'
import { onAuthStateChanged } from 'firebase/auth'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) return

      const notifRef = ref(db, `notifications/${user.uid}`)
      const unsubNotif = onValue(notifRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const notifList = Object.entries(data)
            .filter(([_, val]) => val.createdAt)
            .map(([id, val]) => ({ id, ...val }))
            .sort((a, b) => b.createdAt - a.createdAt)
            console.log('notifList:', notifList)

          setNotifications(notifList)
          setUnreadCount(notifList.filter(n => !n.read).length)
        } else {
          setNotifications([])
          setUnreadCount(0)
        }
      })

      return () => unsubNotif()
    })

    return () => unsubAuth()
  }, [])

  const markAllRead = async () => {
    const currentUser = auth.currentUser
    if (!currentUser) return
    notifications.forEach(async (n) => {
      if (!n.read) {
        await update(ref(db, `notifications/${currentUser.uid}/${n.id}`), {
          read: true
        })
      }
    })
  }

  return { notifications, unreadCount, markAllRead }
}