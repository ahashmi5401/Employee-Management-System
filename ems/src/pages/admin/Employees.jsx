import React, { useState } from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import EmployeeStats from '../../data/admin/EmployeeStats'
import StatList from '../../components/admin/StatList'
import EmployeeTable from '../../components/admin/EmployeeTable'
import AddEmployeeModal from '../../components/admin/AddEmployeeModal'
const Employees = () => {
  const [showModal , setShowModal] = useState(false)
  return (
    <div className='flex h-screen bg-zinc-950'>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar
          title="Employees"
          subTitle="Manage your team"
          btnText="Add Employee"
          onBtnClick={() => setShowModal(true)}
        />
        <main className='flex-1 flex flex-col overflow-y-auto p-6'>
        <StatList data={EmployeeStats} cols='grid-cols-3'/>
        <EmployeeTable />
        </main>
      </div>
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Employees