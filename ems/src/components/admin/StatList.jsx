import { useMediaQuery } from "../../hooks/useMediaQuery"
const StatList = ({ data, cols }) => {
  const { isMobile, isTablet } = useMediaQuery()

  const getResponsiveCols = () => {
    if (!isMobile && !isTablet) return cols
    const count = data.length
    if (count % 2 === 0) return 'grid-cols-2'
    if (count % 3 === 0) return 'grid-cols-3'
    if (count === 1) return 'grid-cols-1'
    return 'grid-cols-2'
  }

  const isOdd = (isMobile || isTablet) && data.length % 2 !== 0 && data.length % 3 !== 0
  const minW = isMobile || isTablet ? '100%' : `${data.length * 200}px`

  return (
    <div style={{ overflowX: 'auto' }} className='scrollBar'>
      <div
        className={`grid ${getResponsiveCols()} gap-3 md:gap-4`}  // ← padding hata diya
        style={{ minWidth: minW }}
      >
        {data.map((item, index) => {
          const { id, label, value, color, msg } = item
          const isLast = index === data.length - 1
          const fullWidth = isOdd && isLast

          return (
            <div
              key={id}
              style={fullWidth ? { gridColumn: '1 / -1' } : {}}
              className="border border-zinc-800 rounded-2xl bg-zinc-900 px-4 py-3 md:px-5 md:py-4 flex flex-col gap-1.5 md:gap-2"
            >
              <h2 className="text-zinc-500 text-[10px] md:text-xs font-semibold tracking-widest uppercase">{label}</h2>
              <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">{value}</span>
              <p className={`${color} text-xs md:text-sm font-medium`}>{msg}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StatList