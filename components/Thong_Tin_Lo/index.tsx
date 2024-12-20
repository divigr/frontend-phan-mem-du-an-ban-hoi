import React, { useState, useEffect } from 'react'
import Header from '../common/Header'
import SharedTable from '../common/SharedTable'
import Filter from '../common/FilterTime'
import { useRouter } from 'next/router'
import { getUserData, UserData } from '../../utils/authHelpers'
import { getDoanhThuChiPhiLoiNhuanByRegion } from '../../services/baoCaoService'

interface RegionProject {
  projectId: string
  projectName: string
  diaChi: string
  fuelConsumption: number
  totalRevenue: number
  totalCost: number
  profit: number
}

interface FuelConsumption {
  tenNhienLieu: string
  tieuHao: number
}

interface Project {
  projectId: string
  projectName: string
  diaChi: string
  fuelConsumption: FuelConsumption[]
  totalRevenue: number
  totalCost: number
  profit: number
}

const QuanLyThongTinLo: React.FC = () => {
  const router = useRouter()
  const { region } = router.query
  const [filteredData, setFilteredData] = useState<RegionProject[]>([])
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())
  const userData: UserData | null = getUserData()

  useEffect(() => {
    fetchRegionData(selectedYear)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, region])

  const fetchRegionData = async (year: number) => {
    try {
      let regionNumber: number
      switch (region) {
        case 'mien-bac':
          regionNumber = 1
          break
        case 'mien-trung':
          regionNumber = 2
          break
        case 'mien-nam':
          regionNumber = 3
          break
        default:
          return
      }
      const response = await getDoanhThuChiPhiLoiNhuanByRegion({ nam: year, region: regionNumber })

      const formattedData = (response.data || []).map((project: Project) => {
        const formattedFuelConsumption = (project.fuelConsumption || [])
          .map((fuel: FuelConsumption) => `${fuel.tenNhienLieu}: ${fuel.tieuHao.toLocaleString('vi-VN')} kg`)
          .join(', ')

        return {
          projectId: project.projectId,
          projectName: project.projectName,
          diaChi: project.diaChi,
          fuelConsumption: formattedFuelConsumption || 'Không có dữ liệu',
          totalRevenue: project.totalRevenue,
          totalCost: project.totalCost,
          profit: project.profit,
        }
      })

      setFilteredData(formattedData)
    } catch (error) {
      console.error('Error fetching region data:', error)
    }
  }

  const handleFilterChange = (status: string, year: number | null) => {
    if (status === 'year' && year) {
      setSelectedYear(year)
    }
  }

  const handleEdit = (item: RegionProject) => {
    router.push({
      pathname: '/thong-tin-lo/add',
      query: { projectId: item.projectId, region },
    })
  }

  const handleAction = (actionType: 'operation' | 'fuel' | 'unitPrice' | 'cost', item: RegionProject) => {
    const paths = {
      operation: '/thong-tin-lo/quan-ly-lo/thong-so-van-hanh',
      fuel: '/thong-tin-lo/quan-ly-lo/nhien-lieu-dau-vao',
      unitPrice: '/thong-tin-lo/quan-ly-lo/don-gia',
      cost: '/thong-tin-lo/quan-ly-lo/chi-phi',
    }

    localStorage.setItem('selectedProject', JSON.stringify(item))

    router.push({
      pathname: paths[actionType],
      query: { projectId: item.projectId, region },
    })
  }

  const totalRevenue = filteredData.reduce((sum, item) => sum + item.totalRevenue, 0)
  const totalCost = filteredData.reduce((sum, item) => sum + item.totalCost, 0)
  const totalProfit = filteredData.reduce((sum, item) => sum + item.profit, 0)

  return (
    <div>
      <Header
        title='Quản Lý Thông Tin Lò'
        backStatus={{ show: true, path: '/', label: 'Trở Lại' }}
        addStatus={
          userData?.user.status === 1
            ? {
                show: true,
                path: `/thong-tin-lo/add?region=${router.query.region}`,
              }
            : undefined
        }
      />

      <Filter status='year' onFilterChange={handleFilterChange} />

      <SharedTable
        columns={[
          { key: 'projectName', label: 'Tên Dự Án' },
          { key: 'diaChi', label: 'Địa Chỉ' },
          { key: 'fuelConsumption', label: 'Tiêu Hao Nhiên Liệu' },
          { key: 'totalRevenue', label: 'Doanh Thu' },
          { key: 'totalCost', label: 'Chi Phí' },
          { key: 'profit', label: 'Lợi Nhuận' },
          { key: 'actions', label: 'Hành Động' },
        ]}
        data={[
          ...filteredData.map((item) => ({
            ...item,
            projectName:
              userData?.user.status === 1 ? (
                <span
                  style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  onClick={() => router.push(`/thong-tin-lo/chi-tiet?projectId=${item.projectId}`)}>
                  {item.projectName}
                </span>
              ) : (
                item.projectName
              ),
            actions: (
              <>
                {userData?.user.status === 1 && (
                  <button onClick={() => handleEdit(item)} className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600'>
                    Chỉnh Sửa
                  </button>
                )}
                {(userData?.user.status === 2 || userData?.user.status === 4) && (
                  <>
                    <button
                      onClick={() => handleAction('operation', item)}
                      className='bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600'>
                      Thông Số Vận Hành
                    </button>
                    <button onClick={() => handleAction('fuel', item)} className='bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'>
                      Nhiên Liệu Đầu Vào
                    </button>
                  </>
                )}
                {userData?.user.status === 3 && (
                  <>
                    <button
                      onClick={() => handleAction('unitPrice', item)}
                      className='bg-purple-500 text-white px-2 py-1 rounded mr-2 hover:bg-purple-600'>
                      Đơn Giá
                    </button>
                    <button onClick={() => handleAction('cost', item)} className='bg-orange-500 text-white px-2 py-1 rounded hover:bg-orange-600'>
                      Chi Phí
                    </button>
                  </>
                )}
              </>
            ),
          })),
          {
            projectName: <b>Tổng</b>,
            diaChi: '',
            fuelConsumption: '',
            totalRevenue: <b>{totalRevenue.toLocaleString('vi-VN')} VND</b>,
            totalCost: <b>{totalCost.toLocaleString('vi-VN')} VND</b>,
            profit: <b>{totalProfit.toLocaleString('vi-VN')} VND</b>,
            actions: '',
          },
        ]}
      />
    </div>
  )
}

export default QuanLyThongTinLo
