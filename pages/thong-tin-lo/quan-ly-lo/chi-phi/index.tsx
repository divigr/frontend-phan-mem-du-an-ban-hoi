import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChiPhi as ChiPhiModel } from '../../../../models/chiPhi'
import { getChiPhiByProjectId } from '../../../../services/chiPhiService'
import ChiPhiIndex from '../../../../components/chiPhi'

const ChiPhi = () => {
  const router = useRouter()
  const { projectId, projectName } = router.query

  const [chiPhis, setChiPhis] = useState<ChiPhiModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchChiPhis = async (month: string | null = null) => {
    if (!projectId) return

    setLoading(true)
    try {
      const data = await getChiPhiByProjectId(projectId as string, month)
      setChiPhis(data || [])
    } catch (error) {
      console.error('Error fetching expenses by projectId:', error)
      setChiPhis([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChiPhis()
  }, [projectId])

  const handleFilterChange = (_: string, month: string | null) => {
    fetchChiPhis(month)
  }

  return <ChiPhiIndex chiPhis={chiPhis} loading={loading} projectName={projectName as string} onFilterChange={handleFilterChange} />
}

export default ChiPhi
