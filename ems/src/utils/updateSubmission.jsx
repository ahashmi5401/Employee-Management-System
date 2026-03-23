import { db } from '../firebase'
import { ref, update, get } from 'firebase/database'
import { createNotification } from './createNotification'

export const approveSubmission = async (submissionId) => {
  try {
    // Pehle data lo
    const snapshot = await get(ref(db, `submissions/${submissionId}`))
    if (snapshot.exists()) {
      const { employeeId, taskTitle } = snapshot.val()

      // Phir update karo
      await update(ref(db, `submissions/${submissionId}`), {
        status: 'Approved',
        adminNote: 'Work approved by Admin',
      })

      // Phir notification bhejo
      await createNotification(
        employeeId,
        `Your submission for "${taskTitle}" has been Approved! ✓`,
        'approved'
      )
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}

export const rejectSubmission = async (submissionId, adminNote) => {
  try {
    // Pehle data lo
    const snapshot = await get(ref(db, `submissions/${submissionId}`))
    if (snapshot.exists()) {
      const { employeeId, taskTitle } = snapshot.val()

      // Phir update karo
      await update(ref(db, `submissions/${submissionId}`), {
        status: 'Rejected',
        adminNote,
      })

      // Phir notification bhejo
      await createNotification(
        employeeId,
        `Your submission for "${taskTitle}" was Rejected. Check admin note.`,
        'rejected'
      )
    }
    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}