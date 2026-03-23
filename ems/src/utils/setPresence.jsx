import { db, auth } from '../firebase'
import { ref, set, onDisconnect, serverTimestamp } from 'firebase/database'

export const setPresence = () => {
  const currentUser = auth.currentUser
  if (!currentUser) return

  const userStatusRef = ref(db, `status/${currentUser.uid}`)

  // Online mark karo
  set(userStatusRef, {
    online: true,
    lastSeen: serverTimestamp(),
  })

  // Browser band ho jaye toh offline ho jaye
  onDisconnect(userStatusRef).set({
    online: false,
    lastSeen: serverTimestamp(),
  })
}