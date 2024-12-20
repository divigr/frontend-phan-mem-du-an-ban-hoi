import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SharedTable from '../common/SharedTable'
import Filter from '../common/FilterTime'

interface RegionData {
  region: string // Khu vực
  totalRevenue: number // Tổng doanh thu
  totalCost: number // Tổng chi phí
  profit: number // Lợi nhuận
  fuelConsumption: number // Tiêu hao nhiên liệu
  year?: number // Thuộc tính năm để lọc
}

interface Props {
  data: RegionData[] // Data for the table
  handleFilterChange: (status: string, value: string | null) => void // Matches the Filter component's signature
}

const defaultRegions: RegionData[] = [
  { region: 'Miền Bắc', totalRevenue: 0, totalCost: 0, profit: 0, fuelConsumption: 0 },
  { region: 'Miền Trung', totalRevenue: 0, totalCost: 0, profit: 0, fuelConsumption: 0 },
  { region: 'Miền Nam', totalRevenue: 0, totalCost: 0, profit: 0, fuelConsumption: 0 },
]

const regionMapping: { [key: string]: string } = {
  'Miền Bắc': 'mien-bac',
  'Miền Trung': 'mien-trung',
  'Miền Nam': 'mien-nam',
}

const RevenueTable: React.FC<Props> = ({ data, handleFilterChange }) => {
  const router = useRouter()
  const [filteredData, setFilteredData] = useState<RegionData[]>([])

  useEffect(() => {
    const mergedData = defaultRegions.map((region) => {
      const matchingData = data.find((item) => item.region === region.region) || {}
      return { ...region, ...matchingData }
    })
    setFilteredData(mergedData)
  }, [data])

  const handleRegionClick = (regionName: string) => {
    const mappedRegion = regionMapping[regionName] || ''
    if (mappedRegion) {
      router.push(`/thong-tin-lo?region=${mappedRegion}`)
    }
  }

  const totals = filteredData.reduce(
    (totals, region) => {
      totals.totalRevenue += region.totalRevenue
      totals.totalCost += region.totalCost
      totals.profit += region.profit
      totals.fuelConsumption += region.fuelConsumption
      return totals
    },
    { totalRevenue: 0, totalCost: 0, profit: 0, fuelConsumption: 0 }
  )

  return (
    <>
      <Filter status='year' onFilterChange={handleFilterChange} />

      <SharedTable
        columns={[
          { key: 'region', label: 'Khu vực' },
          { key: 'totalRevenue', label: 'Doanh thu' },
          { key: 'totalCost', label: 'Chi phí' },
          { key: 'profit', label: 'Lợi nhuận' },
          { key: 'fuelConsumption', label: 'Tiêu hao nhiên liệu' },
        ]}
        data={[
          ...filteredData.map((region) => ({
            region: (
              <span style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }} onClick={() => handleRegionClick(region.region)}>
                {region.region}
              </span>
            ),
            totalRevenue: region.totalRevenue.toLocaleString('vi-VN') + ' VND',
            totalCost: region.totalCost.toLocaleString('vi-VN') + ' VND',
            profit: region.profit.toLocaleString('vi-VN') + ' VND',
            fuelConsumption: region.fuelConsumption.toLocaleString('vi-VN') + ' kg',
          })),
          {
            region: <strong>Tổng</strong>,
            totalRevenue: <strong>{totals.totalRevenue.toLocaleString('vi-VN')} VND</strong>,
            totalCost: <strong>{totals.totalCost.toLocaleString('vi-VN')} VND</strong>,
            profit: <strong style={{ color: totals.profit >= 0 ? 'green' : 'red' }}>{totals.profit.toLocaleString('vi-VN')} VND</strong>,
            fuelConsumption: <strong>{totals.fuelConsumption.toLocaleString('vi-VN')} kg</strong>,
          },
        ]}
      />
    </>
  )
}

export default RevenueTable
