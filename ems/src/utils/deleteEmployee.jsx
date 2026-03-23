import { db } from '../firebase'
import { ref, remove } from 'firebase/database'

export const deleteEmployee = async (uid) => {
  try {
    await remove(ref(db, `users/${uid}`))
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}