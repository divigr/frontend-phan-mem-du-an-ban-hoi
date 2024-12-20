import React from 'react'
import dayjs from 'dayjs'
import Filter from '../common/FilterTime'
import Header from '../common/Header'
import SharedTable from '../common/SharedTable'
import { useRouter } from 'next/router'
import { ThongSoVanHanh } from '../../models/ThongSoVanHanh'
import StatusTag from '../common/StatusTag'

interface ViewThongSoVanHanhProps {
  operationalData: ThongSoVanHanh[]
  loading: boolean
  onFilterChange: (filters: { date?: string }) => void
}

interface RowType {
  ngay?: string
  ca?: string | number
  [key: string]: React.ReactNode
}

const ViewThongSoVanHanh: React.FC<ViewThongSoVanHanhProps> = ({ operationalData, loading, onFilterChange }) => {
  const router = useRouter()
  const { projectId, projectName, region } = router.query

  const handleDateFilterChange = (status: string, value: string | null) => {
    if (status === 'day' && value) {
      onFilterChange({ date: value }) // Pass to parent onFilterChange function
    }
  }

  const handleEdit = (item: RowType) => {
    router.push({
      pathname: '/thong-tin-lo/quan-ly-lo/thong-so-van-hanh/add',
      query: {
        projectId,
        region,
        date: item.ngay || '',
        projectName,
        ca: item.ca,
      },
    })
  }

  const handleAdd = () => {
    router.push({
      pathname: '/thong-tin-lo/quan-ly-lo/thong-so-van-hanh/add',
      query: {
        projectId,
        region,
        date: dayjs().format('YYYY-MM-DD'),
        projectName,
      },
    })
  }

  return (
    <div>
      <Header
        title='Quản Lý Thông Số Vận Hành'
        backStatus={{ show: true, path: `/thong-tin-lo/quan-ly-lo/thong-so-van-hanh?projectId=${projectId}&region=${region}`, label: 'Trở Lại' }}
      />

      <Filter status='day' onFilterChange={handleDateFilterChange} />

      <SharedTable
        onEdit={handleEdit}
        onAdd={handleAdd}
        columns={[
          { key: 'ngay', label: 'Ngày Giờ' },
          { key: 'ca', label: 'Ca' },
          {
            key: 'luongHoi',
            label: 'Lượng Hơi',
            children: [
              { key: 'luongHoiStart', label: 'Chỉ Số Đầu' },
              { key: 'luongHoiEnd', label: 'Chỉ Số Cuối' },
              { key: 'luongHoiConsumption', label: 'Tiêu Thụ' },
            ],
          },
          {
            key: 'dienNang',
            label: 'Điện Năng',
            children: [
              { key: 'dienNangStart', label: 'Chỉ Số Đầu' },
              { key: 'dienNangEnd', label: 'Chỉ Số Cuối' },
              { key: 'dienNangConsumption', label: 'Tiêu Thụ' },
            ],
          },
          {
            key: 'nuocNong',
            label: 'Nước Nóng',
            children: [
              { key: 'nuocNongStart', label: 'Chỉ Số Đầu' },
              { key: 'nuocNongEnd', label: 'Chỉ Số Cuối' },
              { key: 'nuocNongConsumption', label: 'Tiêu Thụ' },
            ],
          },
          {
            key: 'nuocLanh',
            label: 'Nước Lạnh',
            children: [
              { key: 'nuocLanhStart', label: 'Chỉ Số Đầu' },
              { key: 'nuocLanhEnd', label: 'Chỉ Số Cuối' },
              { key: 'nuocLanhConsumption', label: 'Tiêu Thụ' },
            ],
          },
          { key: 'hoaChat', label: 'Hóa Chất' },
          { key: 'muoi', label: 'Muối' },
          { key: 'dauDo', label: 'Dầu DO' },
          {
            key: 'nhienLieuTonKho',
            label: 'Tồn Kho',
          },
          { key: 'trangThai', label: 'Trạng Thái' },
        ]}
        data={operationalData?.map((item) => {
          const mergedLuongHoi = item.luongHoi?.[0] || {}
          const mergedDienNang = item.dienNang?.[0] || {}
          const mergedNuocNong = item.nuocNong?.[0] || {}
          const mergedNuocLanh = item.nuocLanh?.[0] || {}
          const nhienLieuTonKho = item.nhienLieuTonKho.map((fuel, idx) => (
            <span
              key={idx}
              style={{
                padding: '4px 8px',
                backgroundColor: '#e0e7ff',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#1e3a8a',
                marginRight: '4px',
              }}>
              {fuel.loaiNhienLieu?.tenNhienLieu || 'N/A'}: {fuel.soLuong?.toLocaleString('en-US') || 0}
            </span>
          ))

          return {
            ngay: item.ngay ? dayjs(item.ngay).format('DD-MM-YYYY') : 'N/A',
            ca: String(item.ca) || 'N/A', // Convert `ca` to a string
            luongHoiStart: mergedLuongHoi.chiSoDau || 0,
            luongHoiEnd: mergedLuongHoi.chiSoCuoi || 0,
            luongHoiConsumption: mergedLuongHoi.luongTieuThu || (mergedLuongHoi.chiSoCuoi || 0) - (mergedLuongHoi.chiSoDau || 0),
            dienNangStart: mergedDienNang.chiSoDau || 0,
            dienNangEnd: mergedDienNang.chiSoCuoi || 0,
            dienNangConsumption: mergedDienNang.luongTieuThu || (mergedDienNang.chiSoCuoi || 0) - (mergedDienNang.chiSoDau || 0),
            nuocNongStart: mergedNuocNong.chiSoDau || 0,
            nuocNongEnd: mergedNuocNong.chiSoCuoi || 0,
            nuocNongConsumption: mergedNuocNong.luongTieuThu || (mergedNuocNong.chiSoCuoi || 0) - (mergedNuocNong.chiSoDau || 0),
            nuocLanhStart: mergedNuocLanh.chiSoDau || 0,
            nuocLanhEnd: mergedNuocLanh.chiSoCuoi || 0,
            nuocLanhConsumption: mergedNuocLanh.luongTieuThu || (mergedNuocLanh.chiSoCuoi || 0) - (mergedNuocLanh.chiSoDau || 0),
            hoaChat: item.hoaChat || 0,
            muoi: item.muoi || 0,
            dauDo: item.dauDo || 0,
            nhienLieuTonKho: nhienLieuTonKho || 'N/A',
            trangThai: <StatusTag status={item.trangThai} />,
          }
        })}
        loading={loading}
      />
    </div>
  )
}

export default ViewThongSoVanHanh
