import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import Header from '../common/Header'
import SharedTable from '../common/SharedTable'
import Filter from '../common/FilterTime'
import { FuelInput } from '../../models/FuelInput'
import StatusTag from '../common/StatusTag'
import styled from 'styled-components'
import { formatToGMT7 } from '../common/TimeZone'

interface Props {
  fuelInputs: FuelInput[]
  loading: boolean
  onFilterChange: (filters: { date?: string }) => void
  setFuelInputs: React.Dispatch<React.SetStateAction<FuelInput[]>>
}

interface RowType {
  ngay?: string
  [key: string]: React.ReactNode
}

const NhienLieuDauVaoView: React.FC<Props> = ({ fuelInputs, loading, onFilterChange }) => {
  const router = useRouter()
  const { projectId, projectName, date, region } = router.query

  const handleFilterChange = (status: string, selectedDate: string | null) => {
    if (status === 'day') {
      onFilterChange({ date: selectedDate || undefined })
    }
  }

  const handleEdit = (item: RowType) => {
    router.push({
      pathname: '/thong-tin-lo/quan-ly-lo/thong-so-van-hanh/add',
      query: {
        projectId,
        date: item.ngay || '',
        projectName,
        region: region,
      },
    })
  }

  return (
    <>
      <Header
        title={`Nhiên Liệu Đầu Vào Theo Ngày - ${projectName}`}
        backStatus={{ show: true, path: `/thong-tin-lo/quan-ly-lo/nhien-lieu-dau-vao?projectId=${projectId}&region=${region}`, label: 'Trở Lại' }}
        rightComponent={
          <button
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/thong-tin-lo/quan-ly-lo/nhien-lieu-dau-vao/add?date=${date}&projectName=${projectName}&loId=${projectId}`)}>
            + Thêm Thông Tin
          </button>
        }
      />
      <Filter status='day' onFilterChange={handleFilterChange} />
      <SharedTable
        onEdit={handleEdit}
        columns={[
          { key: 'ngay', label: 'Ngày' },
          { key: 'gioVao', label: 'Giờ Vào' },
          { key: 'gioRa', label: 'Giờ Ra' },
          { key: 'soThuTuXe', label: 'Số Xe' },
          { key: 'bienSoXe', label: 'Biển Số' },
          { key: 'maLoaiHang', label: 'Mã Hàng' },
          { key: 'khoiLuongTong', label: 'Khối Lượng Tổng (kg)' },
          { key: 'khoiLuongXe', label: 'Khối Lượng Xe (kg)' },
          { key: 'khoiLuongHang', label: 'Khối Lượng (kg)' },
          { key: 'loaiNhienLieu', label: 'Loại Nhiên Liệu' },
          { key: 'chatLuong', label: 'Chất Lượng' },
          { key: 'nguoiNhanHang', label: 'Nhận Hàng' },
          { key: 'nhaCungCap', label: 'Nhà Cung Cấp' },
          { key: 'diaChiXuatHang', label: 'Địa Chỉ Xuất Hàng' },
          { key: 'trangThai', label: 'Trạng Thái' },
        ]}
        data={fuelInputs.map((input) => ({
          ...input,
          ngay: moment(input.ngayPhieuCan).format('DD-MM-YYYY'),
          loaiNhienLieu: <Tag color='blue'>{input.loaiNhienLieu.name}</Tag>,
          gioVao: formatToGMT7(input.gioVao), // Format time to GMT+7
          gioRa: formatToGMT7(input.gioRa), // Format time to GMT+7
          trangThai: <StatusTag status={input.trangThai} />,
        }))}
        loading={loading}
      />
    </>
  )
}

export default NhienLieuDauVaoView

const Tag = styled.span`
  display: inline-block;
  padding: 5px 8px;
  background-color: #007bff;
  color: white;
  border-radius: 12px;
  font-size: 14px;
  text-align: center;
`
