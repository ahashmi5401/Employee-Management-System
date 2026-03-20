import MyTaskData from '../../data/employee/MyTaskData'

const ProgressList = () => {
  return (
    <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-4'>
      
      <div className="border-b border-zinc-800 pb-3 mb-4">
        <p className='text-white text-sm font-semibold'>Task completion progress</p>
        <span className='text-zinc-500 text-xs'>This month</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MyTaskData.map(({ id, title, progress, progressColor }) => (
          <div key={id}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className='text-zinc-400'>{title}</span>
              <span className='text-zinc-400 font-medium'>{progress}%</span>
            </div>
            <div className='h-1.5 bg-zinc-800 rounded-full overflow-hidden'>
              <div
                className={`h-full ${progressColor} rounded-full`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default ProgressList
