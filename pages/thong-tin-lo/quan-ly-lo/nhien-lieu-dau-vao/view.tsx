import { useEffect, useState } from 'react'
import NhienLieuDauVaoView from '../../../../components/Nhien_Lieu_Dau_Vao/view'
import { useRouter } from 'next/router'
import { getFuelInputByDay } from '../../../../services/nhienLieuDauVao'
import { FuelInput } from '../../../../models/FuelInput'

const NhienLieuDauVao = () => {
  const router = useRouter()
  const { projectId, date } = router.query

  const [fuelInputs, setFuelInputs] = useState<FuelInput[]>([])
  const [loading, setLoading] = useState(true)

  const fetchFuelInputs = async (filters: { date?: string } = {}) => {
    if (!projectId) return

    setLoading(true)
    try {
      const response = await getFuelInputByDay(projectId as string, filters.date || (date as string))

      // Ensure response data exists before mapping
      const formattedData = response.data.map((item: FuelInput) => ({
        ...item,
        loaiNhienLieu: item.loaiNhienLieu ? { id: item.loaiNhienLieu.id, name: item.loaiNhienLieu.name } : { id: '', name: '' },
      }))

      setFuelInputs(formattedData)
    } catch (error) {
      console.error('Error fetching fuel inputs:', error)
      setFuelInputs([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filters: { date?: string }) => {
    fetchFuelInputs(filters)
  }

  useEffect(() => {
    fetchFuelInputs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, date])

  return <NhienLieuDauVaoView fuelInputs={fuelInputs} loading={loading} onFilterChange={handleFilterChange} setFuelInputs={setFuelInputs} />
}

export default NhienLieuDauVao
