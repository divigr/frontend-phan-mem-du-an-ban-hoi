import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import NhienLieuDauVaoIndex from '../../../../components/Nhien_Lieu_Dau_Vao'
import { getFuelInputByMonth } from '../../../../services/nhienLieuDauVao'
import { FuelData } from '../../../../models/FuelInput'

const NhienLieuDauVao = () => {
  const router = useRouter()
  const { projectId } = router.query // Get projectId from the query params
  const [fuelInputs, setFuelInputs] = useState<FuelData[] | null>(null) // To handle data or no data (null)
  const [loading, setLoading] = useState(true) // Manage loading state
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7)) // Default to the current month (YYYY-MM)

  const fetchFuelInputs = async (selectedMonth: string) => {
    if (projectId) {
      setLoading(true) // Start loading
      try {
        const data = await getFuelInputByMonth(projectId as string, selectedMonth)

        if (!data || data.length === 0) {
          setFuelInputs(null) // No data for the selected month
        } else {
          setFuelInputs(data) // Set fetched data
        }
      } catch (error) {
        console.error('Error fetching fuel inputs:', error)
        setFuelInputs(null) // Handle errors gracefully
      } finally {
        setLoading(false) // End loading
      }
    }
  }

  useEffect(() => {
    fetchFuelInputs(month)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, month]) // Re-fetch data when projectId or month changes

  return (
    <NhienLieuDauVaoIndex
      fuelInputs={fuelInputs}
      loading={loading}
      onMonthChange={setMonth} // Pass month change handler to the child component
    />
  )
}

export default NhienLieuDauVao
