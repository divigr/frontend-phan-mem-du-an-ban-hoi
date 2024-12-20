import React, { useEffect, useState } from 'react'
import Filter from '../common/FilterTime'
import Header from '../common/Header'
import SharedTable from '../common/SharedTable'
import { useRouter } from 'next/router'
import { ThongSoVanHanhIndexProps } from '../../models/ThongSoVanHanh'
import { uploadThongSoVanHanh } from '../../services/thongSoDauVaoService'
import moment from 'moment'

interface Props {
  thongSoVanHanhs: ThongSoVanHanhIndexProps[]
  loading: boolean
  onMonthChange: (month: string) => void // Ensure this fetches the updated data
}

const ThongSoVanHanhIndex: React.FC<Props> = ({ thongSoVanHanhs, loading, onMonthChange }) => {
  const router = useRouter()
  const { projectName, projectId, region } = router.query

  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(() => {
    if (uploadSuccess) {
      const currentMonth = moment().format('YYYY-MM')
      setUploadSuccess(false)

      // Update the URL with the current month
      router.push({
        pathname: router.pathname,
        query: { ...router.query, month: currentMonth },
      })

      onMonthChange(currentMonth)
    }
  }, [uploadSuccess, onMonthChange, router])

  const handleFilterChange = (status: string, month: string | null) => {
    if (status === 'month' && month) {
      onMonthChange(month)
    }
  }

  const handleFileUpload = async (projectId: string) => {
    if (!projectId) {
      alert('Project ID is missing.')
      return
    }

    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.csv,.xlsx'

    fileInput.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0]

      if (file) {
        try {
          alert('Uploading file, please wait...')
          await uploadThongSoVanHanh(projectId, file)
          alert('File uploaded successfully!')

          setUploadSuccess(true) // Mark as successful
        } catch (error) {
          alert('File upload failed.')
          console.error('Upload Error:', error)
        }
      } else {
        alert('No file selected.')
      }
    }

    fileInput.click()
  }

  const handleDateClick = (date: string) => {
    router.push({
      pathname: '/thong-tin-lo/quan-ly-lo/thong-so-van-hanh/view',
      query: {
        projectId,
        projectName,
        date,
        region,
      },
    })
  }

  return (
    <div>
      <Header
        title='Quản Lý Thông Số Vận Hành'
        backStatus={{ show: true, path: `/thong-tin-lo?region=${region}`, label: 'Trở Lại' }}
        uploadStatus={{
          show: true,
          onUpload: () => {
            if (projectId) {
              handleFileUpload(projectId as string)
            } else {
              alert('Project ID is not defined.')
            }
          },
        }}
      />

      <Filter status='month' onFilterChange={(status, month) => handleFilterChange(status, month)} />

      <SharedTable
        columns={[
          { key: 'date', label: 'Ngày' },
          { key: 'totalLuongHoi', label: 'Tổng Lượng Hơi Thu Được ( Tấn )' },
          { key: 'totalLuongGas', label: 'Tổng Lượng Gas Tiêu Thụ' },
          { key: 'totalDienNang', label: 'Tổng Điện Năng Tiêu Thụ ( KW )' },
          { key: 'totalDauFo', label: 'Tổng Khối Lượng Dầu FO Tiêu Thụ ( lít dầu )' },
          { key: 'totalNuocNong', label: 'Tổng Nước Nóng Tiêu Thụ ( M³ )' },
          { key: 'totalNuocLanh', label: 'Tổng Nước Lạnh Tiêu Thụ ( M³ )' },
          { key: 'totalHoaChat', label: 'Tổng Hóa Chất ( lít ) ' },
          { key: 'totalMuoi', label: 'Tổng Muối ( kg )' },
          { key: 'totalDauDo', label: 'Tổng Dầu DO ( lít dầu )' },
          { key: 'inventoryTotals', label: 'Nhiên Liệu Tồn Kho ( Tấn )' },
        ]}
        loading={loading}
        data={thongSoVanHanhs.map((item) => ({
          ...item,
          date: (
            <span
              style={{
                cursor: 'pointer',
                color: '#1e3a8a', // Tailwind 'blue-900'
                textDecoration: 'underline',
              }}
              onClick={() => handleDateClick(item.ngay)}>
              {item.ngay}
            </span>
          ),
          inventoryTotals: item.inventoryTotals?.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.inventoryTotals.map((fuel, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#e0e7ff', // Tailwind 'blue-100'
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#1e3a8a', // Tailwind 'blue-900'
                  }}>
                  {fuel.tenNhienLieu}: {fuel.totalSoLuong.toLocaleString('en-US')}
                </span>
              ))}
            </div>
          ) : (
            <span style={{ fontStyle: 'italic', color: '#6b7280' }}>Không có dữ liệu</span>
          ),
        }))}
      />
    </div>
  )
}

export default ThongSoVanHanhIndex
