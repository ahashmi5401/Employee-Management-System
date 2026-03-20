import React, { useState } from 'react'
import MyTaskData from '../../data/employee/MyTaskData'

const SubmitWorkForm = () => {
  const [selectedTask, setSelectedTask] = useState(MyTaskData[0])
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState('')
  const [completion, setCompletion] = useState('')
  const [notes, setNotes] = useState('')

  const handleTaskChange = (e) => {
    const task = MyTaskData.find(t => t.id === parseInt(e.target.value))
    setSelectedTask(task)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description || !hours || !completion) {
      alert('Please fill all required fields')
      return
    }
    console.log({ selectedTask, description, hours, completion, notes })
  }

  return (
    <div className='flex gap-4'>

      {/* FORM */}
      <div className='flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4'>
        
        <div className='border-b border-zinc-800 pb-3'>
          <h2 className='text-white text-sm font-semibold'>Work submission form</h2>
          <span className='text-zinc-500 text-xs'>Fill all details carefully</span>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

          {/* Select Task */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Select Task</label>
            <select
              onChange={handleTaskChange}
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all'
            >
              {MyTaskData.map(({ id, title, priority }) => (
                <option key={id} value={id}>{title} — {priority} Priority</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Work Description <span className='text-red-500'>*</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder='Describe what you did and how you solved it...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none placeholder-zinc-600'
            />
          </div>

          {/* Hours + Completion */}
          <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Hours Spent <span className='text-red-500'>*</span></label>
              <input
                type='number'
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder='e.g. 4'
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Completion % <span className='text-red-500'>*</span></label>
              <input
                type='number'
                value={completion}
                onChange={(e) => setCompletion(e.target.value)}
                placeholder='e.g. 80'
                min='0'
                max='100'
                className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all placeholder-zinc-600'
              />
            </div>
          </div>

          {/* Notes */}
          <div className='flex flex-col gap-1.5'>
            <label className='text-zinc-400 text-xs font-semibold tracking-widest uppercase'>Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder='Any blockers or additional notes...'
              className='bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 text-sm outline-none focus:border-red-600 transition-all resize-none placeholder-zinc-600'
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3 mt-2'>
            <button
              type='submit'
              className='flex-1 bg-red-600 hover:bg-red-500 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all duration-200'
            >
              Submit Work
            </button>
            <button
              type='button'
              className='flex-1 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-zinc-300 text-sm font-semibold py-3 rounded-xl transition-all duration-200'
            >
              Save Draft
            </button>
          </div>

        </form>
      </div>

      {/* TASK DETAILS */}
      <div className='w-[280px] flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-2xl p-5'>
        
        <div className='border-b border-zinc-800 pb-3 mb-3'>
          <h2 className='text-white text-sm font-semibold'>Task details</h2>
        </div>

        <div className='flex flex-col'>
          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Task</span>
            <span className='text-white text-xs font-medium'>{selectedTask?.title}</span>
          </div>
          <div className='flex justify-between items-center py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Priority</span>
            <span className={`${selectedTask?.priorityStyle} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
              {selectedTask?.priority}
            </span>
          </div>
          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Due Date</span>
            <span className='text-white text-xs'>{selectedTask?.dueDate}</span>
          </div>
          <div className='flex justify-between py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Assigned by</span>
            <span className='text-white text-xs'>Admin</span>
          </div>
          <div className='flex justify-between items-center py-2.5 border-b border-zinc-800'>
            <span className='text-zinc-500 text-xs'>Status</span>
            <span className={`${selectedTask?.statusStyle} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
              {selectedTask?.status}
            </span>
          </div>
          <div className='py-2.5'>
            <span className='text-zinc-500 text-xs'>Description</span>
            <p className='text-zinc-400 text-xs mt-1.5 leading-relaxed'>{selectedTask?.desc}</p>
          </div>
        </div>

      </div>

    </div>
  )
}

export default SubmitWorkForm
