import { db } from '../firebase'
import { ref, remove } from 'firebase/database'

export const deleteTask = async (taskId) => {
  try {
    await remove(ref(db, `tasks/${taskId}`))
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}