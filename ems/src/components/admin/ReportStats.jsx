import StatList from './StatList'
import {getReportPageStats} from '../../data/admin/AdminStatConfig'
import {useAdminStats} from'../../hooks/useStats'


const ReportStats = () => {
  const stats = useAdminStats()
  return (
    <div className='mb-4'>
      <StatList data={getReportPageStats(stats)} cols='grid-cols-4' />
    </div>
  )
}

export default ReportStats