import { db } from '../firebase'
import { ref, remove, get } from 'firebase/database'
import { createNotification } from './createNotifications'

export const deleteTask = async (taskId) => {
  try {
    const snapshot = await get(ref(db, `tasks/${taskId}`))
    console.log('snapshot exists:', snapshot.exists())  // ← add karo
    if (snapshot.exists()) {
      const { assignedTo, title } = snapshot.val()
      console.log('assignedTo:', assignedTo)  // ← add karo
      console.log('title:', title)            // ← add karo

      await remove(ref(db, `tasks/${taskId}`))
      console.log('task removed!')            // ← add karo

      await createNotification(
        assignedTo,
        `Task "${title}" has been deleted by Admin.`,
        'deleted'
      )
      console.log('notification sent!')       // ← add karo
    }
    return { success: true }
  } catch (err) {
    console.error('deleteTask error:', err)
    return { success: false, error: err.message }
  }
}