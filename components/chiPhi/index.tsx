import { useState } from 'react'
import { useRouter } from 'next/router'
import Header from '../common/Header'
import FilterTime from '../common/FilterTime'
import { deleteChiPhi } from '../../services/chiPhiService'
import { ChiPhi } from '../../models/chiPhi'
import SharedTable from '../common/SharedTable'

interface ChiPhiIndexProps {
  chiPhis: ChiPhi[]
  loading: boolean
  projectName: string
  onFilterChange: (status: string, value: string | null) => void
}

const ChiPhiIndex: React.FC<ChiPhiIndexProps> = ({ chiPhis, loading, projectName, onFilterChange }) => {
  const [selectedChiPhi, setSelectedChiPhi] = useState<ChiPhi | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { projectId } = router.query

  const handleView = (chiPhi: ChiPhi) => {
    setSelectedChiPhi(chiPhi)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedChiPhi(null)
  }

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Bạn có muốn xóa chi phí này không?')
    if (confirmed) {
      try {
        await deleteChiPhi(id)
        router.reload() // Refresh list
      } catch (error) {
        console.error('Failed to delete chi phí:', error)
        alert('Có lỗi xảy ra khi xóa chi phí này.')
      }
    }
  }

  const columns = [
    { key: 'chiPhiLuongNhanCong', label: 'Chi Phí Lương Nhân Công' },
    { key: 'chiPhiKhauHao', label: 'Chi Phí Khấu Hao' },
    { key: 'chiPhiPhanBo', label: 'Chi Phí Phân Bổ' },
    { key: 'chiPhiLaiVay', label: 'Chi Phí Lãi Vay' },
    { key: 'chiPhiSuaChuaBaoTri', label: 'Chi Phí Sửa Chữa Bảo Trì' },
    { key: 'chiPhiCongTac', label: 'Chi Phí Công Tác' },
    { key: 'chiPhiKhac', label: 'Chi Phí Khác' },
    { key: 'chiPhiBHXH', label: 'Chi Phí Bảo Hiểm Xã Hội' },
    { key: 'trangThai', label: 'Trạng Thái' },
  ]

  const data = chiPhis.map((item) => ({
    ...item,
    trangThai: item.trangThai === 1 ? 'Draft' : item.trangThai === 2 ? 'Public' : 'Rejected',
  }))

  return (
    <>
      <Header
        title={`Chi Phí: ${projectName}`}
        backStatus={{
          show: true,
          path: `/thong-tin-lo`,
          label: 'Trở Lại',
        }}
        rightComponent={
          <button
            onClick={() => router.push(`/thong-tin-lo/quan-ly-lo/chi-phi/add?projectId=${projectId}`)}
            style={{
              backgroundColor: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}>
            + Thêm Chi Phí
          </button>
        }
      />
      <FilterTime status='month' onFilterChange={onFilterChange} />
      <SharedTable columns={columns} data={data} loading={loading} />
    </>
  )
}

export default ChiPhiIndex
