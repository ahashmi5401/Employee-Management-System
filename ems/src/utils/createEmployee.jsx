import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'

export const createEmployee = async (name, email, password, designation, department, role , adminEmail, adminPassword) => {
  try {
    const employeeCredential = await createUserWithEmailAndPassword(auth, email, password)
    const employeeUID = employeeCredential.user.uid

    await set(ref(db, `users/${employeeUID}`), {
      name,
      email,
      role,
      designation,
      department,
    })

    await signInWithEmailAndPassword(auth, adminEmail, adminPassword)

    return { success: true }

  } catch (err) {
    return { success: false, error: err.message }
  }
}