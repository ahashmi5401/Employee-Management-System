import { db } from '../firebase'
import { ref, push, set } from 'firebase/database'
import { createNotification } from './createNotification'

export const createTask = async (title, desc, assignedTo, assignedToName, priority, dueDate) => {
  try {
    const taskRef = push(ref(db, 'tasks'))
    await set(taskRef, {
      title,
      desc,
      assignedTo,
      assignedToName,
      priority,
      dueDate,
      status: 'Pending',
      createdAt: Date.now(),
    })

    // Employee ko notification bhejo
    await createNotification(
      assignedTo,
      `New task assigned: "${title}" — ${priority} priority`,
      'task'
    )

    return { success: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}