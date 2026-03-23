import { useState, useEffect } from 'react'
import { auth, db } from '../firebase'
import { ref, onValue } from 'firebase/database'

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const userRef = ref(db, `users/${currentUser.uid}`)
    const unsub = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          ...snapshot.val()
        })
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return { profile, loading }
}