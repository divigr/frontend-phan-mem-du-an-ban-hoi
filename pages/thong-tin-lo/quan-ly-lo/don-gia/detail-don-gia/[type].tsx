import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DonGiaHoi from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaHoi'
import DonGiaGas from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaGas'
import DonGiaDauFO from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaDauFO'
import DonGiaDauDO from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaDauDO'
import DonGiaDien from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaDien'
import DonGiaNuocLanh from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaNuocLanh'
import DonGiaMuoi from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaMuoi'
import DonGiaHoaChat from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaHoaChat'
import DonGiaNhienLieu from '../../../../../components/DonGia/Detail_Chi_Tiet_DonGia/DonGiaNhienLieu'
import Header from '../../../../../components/common/Header'
import Filter from '../../../../../components/common/FilterTime'

const DetailDonGia = () => {
  const router = useRouter()
  const { type, projectId, region } = router.query

  const [filterDate, setFilterDate] = useState<string | null>(new Date().toISOString().slice(0, 7)) // Default to current month

  const handleFilterChange = (status: string, value: string | null) => {
    if (status === 'month') {
      setFilterDate(value)
    }
  }

  const renderComponent = () => {
    switch (type) {
      case 'hoi':
        return <DonGiaHoi projectId={projectId} filterDate={filterDate} />
      case 'gas':
        return <DonGiaGas projectId={projectId} filterDate={filterDate} />
      case 'dau-fo':
        return <DonGiaDauFO projectId={projectId} filterDate={filterDate} />
      case 'dau-do':
        return <DonGiaDauDO projectId={projectId} filterDate={filterDate} />
      case 'dien':
        return <DonGiaDien projectId={projectId} filterDate={filterDate} />
      case 'nuoc-lanh':
        return <DonGiaNuocLanh projectId={projectId} filterDate={filterDate} />
      case 'muoi':
        return <DonGiaMuoi projectId={projectId} filterDate={filterDate} />
      case 'hoa-chat':
        return <DonGiaHoaChat projectId={projectId} filterDate={filterDate} />
      case 'nhien-lieu':
        return <DonGiaNhienLieu projectId={projectId} filterDate={filterDate} />
      default:
        return <p>Loại đơn giá không hợp lệ</p>
    }
  }

  return (
    <div>
      <Header
        title='Chi Tiết Đơn Giá'
        backStatus={{ show: true, path: `/thong-tin-lo/quan-ly-lo/don-gia?projectId=${projectId}&region=${region}`, label: 'Trở Lại' }}
      />
      <Filter status='month' onFilterChange={handleFilterChange} />
      {renderComponent()}
    </div>
  )
}

export default DetailDonGia
