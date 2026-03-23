import { useAdminStats } from '../../hooks/useStats'
import StatList from './StatList'
import { getDashboardStats } from '../../data/admin/adminStatConfig'

const DashboardStat = () => {
  const stats = useAdminStats()


  return <StatList data={getDashboardStats(stats)} cols='grid-cols-5' />
}

export default DashboardStat