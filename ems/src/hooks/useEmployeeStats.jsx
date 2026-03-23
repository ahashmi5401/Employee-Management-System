import { useState, useEffect } from "react"
import { auth, db } from "../firebase"  // ← duplicate auth import hata diya
import { ref, onValue } from "firebase/database"

export const useEmployeeStats = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    totalSubmissions: 0,
    pendingSubmissions: 0,
    approvedSubmissions: 0,
    rejectedSubmissions: 0,
    completedTasks: 0,    
    pendingTasks: 0,
    highPriorityTasks: 0,
    totalHours : 0,
  })

  useEffect(() => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    // Tasks
    const tasksRef = ref(db, "tasks")
    const unsubTasks = onValue(tasksRef, (snapshot) => {  // ← unsub → unsubTasks
      if (snapshot.exists()) {  // ← exists() not exist()
        const data = snapshot.val()  // ← snapshot.val() not snapshot().val()
        const myTasks = Object.values(data)  // ← values not entries
          .filter(t => t.assignedTo === currentUser.uid)

        setStats(prev => ({
          ...prev,
          totalTasks: myTasks.length,
          pendingTasks: myTasks.filter(t => t.status === "Pending").length,
          completedTasks: myTasks.filter(t => t.status === "Completed").length,
          highPriorityTasks: myTasks.filter(t => t.priority === "High").length,
        }))
      }
    })

    // Submissions
    const subRef = ref(db, "submissions")  // ← comma missing tha
    const unsubSubs = onValue(subRef, (snapshot) => {
      if (snapshot.exists()) {  // ← exist() → exists()
        const data = snapshot.val()
        const mySubmissions = Object.values(data)  // ← values not entries
          .filter(s => s.employeeId === currentUser.uid)  // ← employeeId not currentUser

        setStats(prev => ({
          ...prev,
          totalSubmissions: mySubmissions.length,
          approvedSubmissions: mySubmissions.filter(s => s.status === "Approved").length,  // ← capital A
          rejectedSubmissions: mySubmissions.filter(s => s.status === "Rejected").length,  // ← capital R
          totalHours: mySubmissions.reduce((acc, s) => acc + (s.hoursSpent || 0), 0),
        }))
      }
    })

    return () => {
      unsubTasks()   // ← comma nahi, semicolon ya alag lines
      unsubSubs()    // ← unsubSubmissions → unsubSubs
    }
  }, [])  // ← [] missing tha — infinite loop hota

  return stats
}