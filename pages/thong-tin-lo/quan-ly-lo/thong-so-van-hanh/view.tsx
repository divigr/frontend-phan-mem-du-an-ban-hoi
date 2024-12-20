import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getThongSoTheoNgay } from '../../../../services/thongSoDauVaoService'
import ViewThongSoVanHanh from '../../../../components/Thong_So_Van_Hanh/view'
import { ThongSoVanHanh } from '../../../../models/ThongSoVanHanh'
import { generateDefaultShifts } from '../../../../models/ThongSoVanHanhUtils'
import dayjs from 'dayjs'

const ThongSoVanHanhDetail = () => {
  const router = useRouter()
  const { projectId, date } = router.query

  const [operationalData, setOperationalData] = useState<ThongSoVanHanh[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Helper to ensure the date is a valid string
  const getValidatedDate = (inputDate: string | string[] | undefined): string => {
    if (Array.isArray(inputDate)) {
      console.warn('Date is an array. Using the first value.')
      inputDate = inputDate[0]
    }
    if (inputDate && dayjs(inputDate).isValid()) {
      return inputDate
    }
    console.warn('Invalid or missing date. Defaulting to today.')
    return dayjs().format('YYYY-MM-DD')
  }

  // Helper to merge data with defaults
  const mergeDataWithDefaults = (fetchedData: ThongSoVanHanh[], selectedDate: string): ThongSoVanHanh[] => {
    const defaultShifts = generateDefaultShifts(selectedDate, projectId as string)

    const dataMap = new Map(fetchedData.map((item) => [`${dayjs(item.ngay).format('YYYY-MM-DD')}-${item.ca}`, item]))

    return defaultShifts.map((shift) => {
      const key = `${dayjs(shift.ngay).format('YYYY-MM-DD')}-${shift.ca}`
      const matchedData = dataMap.get(key)
      return matchedData ? { ...shift, ...matchedData } : shift
    })
  }

  // Fetch data from the server
  const fetchData = async (filters: { date?: string } = {}) => {
    if (!projectId) return

    setLoading(true)
    try {
      const selectedDate = getValidatedDate(filters.date || (date as string | undefined))

      const fetchedData: ThongSoVanHanh[] = await getThongSoTheoNgay(projectId as string, selectedDate)

      const mergedData = mergeDataWithDefaults(fetchedData, selectedDate)
      setOperationalData(mergedData)
    } catch (error) {
      console.error('Error fetching operational data:', error)
      setOperationalData(generateDefaultShifts(dayjs().format('YYYY-MM-DD'), projectId as string))
    } finally {
      setLoading(false)
    }
  }

  // Handle filter changes
  const handleFilterChange = (filters: { date?: string }) => {
    const validDate = getValidatedDate(filters.date)
    const newQuery = { ...router.query, date: validDate }

    router.push({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true })
    fetchData({ date: validDate })
  }

  // Initial data fetch
  useEffect(() => {
    const validatedDate = getValidatedDate(date)
    fetchData({ date: validatedDate })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, date])

  return <ViewThongSoVanHanh operationalData={operationalData} loading={loading} onFilterChange={handleFilterChange} />
}

export default ThongSoVanHanhDetail
