import React, { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./firebase"
import { ref, get } from "firebase/database"
import { Routes, Route, Navigate } from 'react-router-dom'
import { setPresence } from './utils/setPresence'

import Login from "./pages/Login"
import AdminDashboard from "./pages/admin/AdminDashboard"
import Employees from "./pages/admin/Employees"
import Tasks from "./pages/admin/Tasks"
import Submissions from "./pages/admin/Submissions"
import Reports from "./pages/admin/Reports"
import EmployeeDashboard from './pages/employee/EmployeeDashboard'
import MyTasks from "./pages/employee/MyTasks"
import SubmitWork from "./pages/employee/SubmitWork"
import History from "./pages/employee/History"
import Profile from "./pages/employee/Profile"

const App = () => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        setPresence()
        try {
          const snapshot = await get(ref(db, `users/${user.uid}`))
          if (snapshot.exists()) {
            setRole(snapshot.val().role)
          } else {
            setRole(null)
          }
        } catch (err) {
          console.error("Error fetching role:", err)
          setRole(null)
        }
      } else {
        setUser(null)
        setRole(null)
      }
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <p className="text-zinc-400">Loading...</p>
    </div>
  )

  // Admin aur Superadmin dono same pages dekhenge
  const isAdmin = role === 'admin' || role === 'superadmin'

  return (
    <Routes>
      <Route path="/" element={
        !user ? <Login /> :
        isAdmin ? <Navigate to="/admin/dashboard" /> :
        role === 'employee' ? <Navigate to="/employee/dashboard" /> :
        <Login />
      } />

      {/* Admin + Superadmin routes */}
      <Route path="/admin/dashboard"   element={user && isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
      <Route path="/admin/employees"   element={user && isAdmin ? <Employees />      : <Navigate to="/" />} />
      <Route path="/admin/tasks"       element={user && isAdmin ? <Tasks />          : <Navigate to="/" />} />
      <Route path="/admin/submissions" element={user && isAdmin ? <Submissions />    : <Navigate to="/" />} />
      <Route path="/admin/reports"     element={user && isAdmin ? <Reports />        : <Navigate to="/" />} />

      {/* Employee routes */}
      <Route path="/employee/dashboard"  element={user && role === 'employee' ? <EmployeeDashboard /> : <Navigate to="/" />} />
      <Route path="/employee/tasks"      element={user && role === 'employee' ? <MyTasks />           : <Navigate to="/" />} />
      <Route path="/employee/submitwork" element={user && role === 'employee' ? <SubmitWork />        : <Navigate to="/" />} />
      <Route path="/employee/history"    element={user && role === 'employee' ? <History />           : <Navigate to="/" />} />
      <Route path="/employee/profile"    element={user && role === 'employee' ? <Profile />           : <Navigate to="/" />} />
    </Routes>
  )
}

export default App