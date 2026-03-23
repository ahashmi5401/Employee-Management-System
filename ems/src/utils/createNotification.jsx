import { db } from '../firebase'
import { ref, push, set } from 'firebase/database'

export const createNotification = async (userId, message, type) => {
  try {
    if (!userId) {
      console.error('createNotification: userId is undefined!')
      return { success: false, error: 'userId is undefined' }
    }
    const notifRef = push(ref(db, `notifications/${userId}`))
    await set(notifRef, {
      message,
      type,
      read: false,
      createdAt: Date.now(),
    })
    return { success: true }
  } catch (err) {
    console.error('Notification error:', err)
    return { success: false, error: err.message }
  }
}