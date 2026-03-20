const StatList = ({ data, cols }) => {
  return (
    <div className={`grid ${cols} gap-4 px-6 py-6`}>
      {data.map((item) => {
        const { id, label, value , color , msg } = item
        return (
          <div key={id} className="border border-zinc-800 rounded-2xl bg-zinc-900 px-5 py-4 flex flex-col gap-2">
            <h2 className="text-zinc-500 text-xs font-semibold tracking-widest uppercase">{label}</h2>
            <span className="text-white text-3xl font-bold tracking-tight">{value}</span>
            <p className={`${color} text-sm font-medium`}>{msg}</p>
          </div>
        )
      })}
    </div>
  )
}

export default StatList