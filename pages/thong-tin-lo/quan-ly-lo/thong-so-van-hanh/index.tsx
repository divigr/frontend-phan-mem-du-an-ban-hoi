import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ThongSoVanHanhIndex from '../../../../components/Thong_So_Van_Hanh'
import { getThongSoTheoThang } from '../../../../services/thongSoDauVaoService'
import dayjs from 'dayjs'
import { InventoryTotal, ThongSoVanHanhIndexProps } from '../../../../models/ThongSoVanHanh'

const ThongSoVanHanh = () => {
  const router = useRouter()
  const { projectId } = router.query

  const [month, setMonth] = useState<string>(dayjs().format('YYYY-MM'))
  const [thongSoVanHanhs, setThongSoVanHanhs] = useState<ThongSoVanHanhIndexProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const generateDefaultDays = (month: string): ThongSoVanHanhIndexProps[] => {
    const daysInMonth = dayjs(month).daysInMonth()
    return Array.from({ length: daysInMonth }, (_, index) => ({
      ngay: dayjs(`${month}-${index + 1}`).format('YYYY-MM-DD'),
      totalLuongHoi: 0,
      totalDienNang: 0,
      totalLuongGas: 0,
      totalNuocNong: 0,
      totalNuocLanh: 0,
      totalHoaChat: 0,
      totalMuoi: 0,
      totalDauDo: 0,
      totalDauFo: 0,
      inventoryTotals: [],
    }))
  }

  const mergeDataWithDefaults = (fetchedData: ThongSoVanHanhIndexProps[], defaultDays: ThongSoVanHanhIndexProps[]): ThongSoVanHanhIndexProps[] => {
    // Helper to group and sum inventory totals
    const groupInventoryTotals = (inventory: InventoryTotal[]): InventoryTotal[] => {
      const grouped = inventory.reduce((acc, item) => {
        const key = `${item.tenNhienLieu}-${item.thuongHieu}-${item.loaiNhienLieu}`
        if (!acc[key]) {
          acc[key] = { ...item }
        } else {
          acc[key].totalSoLuong += item.totalSoLuong
        }
        return acc
      }, {} as Record<string, InventoryTotal>)
      return Object.values(grouped)
    }

    // Group data by 'ngay'
    const groupedData = fetchedData.reduce((acc, item) => {
      const dayKey = dayjs(item.ngay).format('YYYY-MM-DD')
      if (!acc[dayKey]) {
        acc[dayKey] = { ...item, inventoryTotals: [] }
      }

      // Merge inventoryTotals if they exist
      if (item.inventoryTotals) {
        acc[dayKey].inventoryTotals = [...(acc[dayKey].inventoryTotals || []), ...item.inventoryTotals]
      }

      // Merge other metrics
      acc[dayKey] = {
        ...acc[dayKey],
        totalDienNang: (acc[dayKey].totalDienNang || 0) + (item.totalDienNang || 0),
        totalNuocNong: (acc[dayKey].totalNuocNong || 0) + (item.totalNuocNong || 0),
        totalNuocLanh: (acc[dayKey].totalNuocLanh || 0) + (item.totalNuocLanh || 0),
        totalLuongHoi: (acc[dayKey].totalLuongHoi || 0) + (item.totalLuongHoi || 0),
        totalLuongGas: (acc[dayKey].totalLuongGas || 0) + (item.totalLuongGas || 0),
        totalHoaChat: (acc[dayKey].totalHoaChat || 0) + (item.totalHoaChat || 0),
        totalMuoi: (acc[dayKey].totalMuoi || 0) + (item.totalMuoi || 0),
        totalDauDo: (acc[dayKey].totalDauDo || 0) + (item.totalDauDo || 0),
        totalDauFo: (acc[dayKey].totalDauFo || 0) + (item.totalDauFo || 0),
      }

      return acc
    }, {} as Record<string, ThongSoVanHanhIndexProps>)

    // Map default days and merge with grouped data
    return defaultDays.map((day) => {
      const fetchedItem = groupedData[day.ngay]
      if (fetchedItem) {
        // Process inventoryTotals to combine duplicates
        fetchedItem.inventoryTotals = groupInventoryTotals(fetchedItem.inventoryTotals || [])
      }
      return fetchedItem ? { ...day, ...fetchedItem } : day
    })
  }

  const fetchThongSo = async (selectedMonth: string) => {
    console.log('Fetching data for selected month:', selectedMonth) // Debugging log

    if (projectId) {
      setLoading(true)
      try {
        const response: ThongSoVanHanhIndexProps[] = await getThongSoTheoThang(projectId as string, selectedMonth)

        const defaultDays = generateDefaultDays(selectedMonth)
        const mergedData = mergeDataWithDefaults(response, defaultDays)

        setThongSoVanHanhs(mergedData)
      } catch (error) {
        console.error('Error fetching operational parameters:', error)
        setThongSoVanHanhs(generateDefaultDays(selectedMonth))
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (projectId) {
      console.log('Fetching data for:', { projectId, month })
      fetchThongSo(month)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, month])

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth) // Updates state
  }

  return <ThongSoVanHanhIndex thongSoVanHanhs={thongSoVanHanhs} loading={loading} onMonthChange={handleMonthChange} />
}

export default ThongSoVanHanh
