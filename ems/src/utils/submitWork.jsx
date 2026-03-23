import { db, auth } from '../firebase'
import { ref, push, set } from 'firebase/database'

export const submitWork = async (taskId, taskTitle, description, hours, completion, notes) => {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) return { success: false, error: 'Not logged in' }

    const submissionRef = push(ref(db, 'submissions'))
    await set(submissionRef, {
      taskId,
      taskTitle,
      employeeId: currentUser.uid,
      employeeName: currentUser.displayName || 'Employee',
      description,
      hoursSpent: parseInt(hours),
      completion: parseInt(completion),
      notes,
      status: 'Pending',
      submittedAt: Date.now(),
    })

    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}