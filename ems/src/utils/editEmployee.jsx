import { db } from '../firebase'
import { ref, update } from 'firebase/database'

export const editEmployee = async (uid, updatedData) => {
  try {
    await update(ref(db, `users/${uid}`), updatedData)
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}