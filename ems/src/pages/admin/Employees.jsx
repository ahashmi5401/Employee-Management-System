import React, { useState, useEffect } from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import StatList from '../../components/admin/StatList'
import EmployeeTable from '../../components/admin/EmployeeTable'
import AddEmployeeModal from '../../components/admin/AddEmployeeModal'
import EditEmployeeModal from '../../components/admin/EditEmployeeModal'
import { useAdminStats } from '../../hooks/useStats'
import { getEmployeePageStats } from '../../data/admin/AdminStatConfig'
import { auth, db } from '../../firebase'
import { ref, get } from 'firebase/database'

const Employees = () => {
  const stats = useAdminStats()
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentUserRole, setCurrentUserRole] = useState(null)

  useEffect(() => {
    const fetchRole = async () => {
      const user = auth.currentUser
      if (!user) return
      const snapshot = await get(ref(db, `users/${user.uid}`))
      if (snapshot.exists()) {
        setCurrentUserRole(snapshot.val().role)
      }
    }
    fetchRole()
  }, [])

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setShowEditModal(true)
  }

  return (
    <div className='flex h-screen bg-zinc-950 overflow-hidden'>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          title="Employees"
          subTitle="Manage your team"
          btnText="Add Employee"
          onBtnClick={() => setShowModal(true)}
        />
        <main className='flex-1   overflow-y-auto  p-4 md:p-6 gap-4'>
          <StatList data={getEmployeePageStats(stats)} cols='grid-cols-4' />
          <EmployeeTable onEdit={handleEdit} />
        </main>
      </div>

      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
          currentUserRole={currentUserRole}
        />
      )}

      {showEditModal && selectedEmployee && (
        <EditEmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

export default Employees