import React, { useState } from 'react'
import Navbar from '../../components/admin/Navbar'
import Sidebar from '../../components/admin/Sidebar'
import StatList from '../../components/admin/StatList'
import { useAdminStats } from '../../hooks/useStats'
import TaskTable from '../../components/admin/TaskTable'
import AddTaskModal from '../../components/admin/AddTaskModal'
import EditTaskModal from '../../components/admin/EditTaskModal'
import { getTaskPageStats } from '../../data/admin/AdminStatConfig'

const Tasks = () => {
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const stats = useAdminStats()

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  return (
    <div className='flex h-screen bg-zinc-950 overflow-hidden'>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar
          title="Tasks"
          subTitle="Manage all tasks"
          btnText="Assign Task"
          onBtnClick={() => setShowModal(true)}
        />
        <main className='flex-1   overflow-y-auto  p-4 md:p-6 gap-4 scrollBar'>
          <StatList data={getTaskPageStats(stats)} cols='grid-cols-4' />
          <TaskTable onEdit={handleEdit} />
        </main>
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {showEditModal && selectedTask && (
        <EditTaskModal
          task={selectedTask}
          onClose={() => setShowEditModal(false)}
          onSuccess={() => setShowEditModal(false)}
        />
      )}
    </div>
  )
}

export default Tasks