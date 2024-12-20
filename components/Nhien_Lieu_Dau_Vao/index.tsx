import React, { useEffect, useState } from 'react'
import Filter from '../common/FilterTime'
import Header from '../common/Header'
import SharedTable from '../common/SharedTable'
import { useRouter } from 'next/router'
import { uploadNhienLieuDauVao } from '../../services/nhienLieuDauVao'
import moment from 'moment'

interface FuelData {
  date: string
  totalKhoiLuongHang: number
  totalSoThuTuXe: number
}

interface Props {
  fuelInputs: FuelData[] | null // Allow null when no data
  loading: boolean
  onMonthChange: (month: string) => void // Handler to fetch updated data
}

const NhienLieuDauVaoIndex: React.FC<Props> = ({ fuelInputs, loading, onMonthChange }) => {
  const router = useRouter()
  const { projectName, projectId, region } = router.query

  const [uploadSuccess, setUploadSuccess] = useState(false) // Track upload status

  useEffect(() => {
    if (uploadSuccess) {
      const currentMonth = moment().format('YYYY-MM')
      setUploadSuccess(false)

      // Update the URL with the current month and fetch data
      router.push({
        pathname: router.pathname,
        query: { ...router.query, month: currentMonth },
      })

      onMonthChange(currentMonth) // Trigger data refresh
    }
  }, [uploadSuccess, onMonthChange, router])

  const handleFilterChange = (status: string, month: string | null) => {
    if (status === 'month' && month) {
      onMonthChange(month) // Fetch data for the selected month
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
          await uploadNhienLieuDauVao(projectId, file)
          alert('File uploaded successfully!')
          setUploadSuccess(true) // Mark upload as successful
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
      pathname: '/thong-tin-lo/quan-ly-lo/nhien-lieu-dau-vao/view',
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
        title={`Quản Lý Nhiên Liệu Đầu Vào - ${projectName}`}
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

      <Filter status='month' onFilterChange={handleFilterChange} />

      <SharedTable
        columns={[
          { key: 'date', label: 'Ngày' },
          { key: 'totalKhoiLuongHang', label: 'Tổng Khối Lượng Hàng ( Tấn )' },
          { key: 'totalSoThuTuXe', label: 'Tổng Số Thứ Tự Xe' },
        ]}
        loading={loading}
        data={
          fuelInputs
            ? fuelInputs.map((item) => ({
                ...item,
                date: (
                  <span
                    style={{
                      cursor: 'pointer',
                      color: '#1e3a8a', // Tailwind 'blue-900'
                      textDecoration: 'underline',
                    }}
                    onClick={() => handleDateClick(item.date)}>
                    {item.date}
                  </span>
                ),
              }))
            : []
        }
      />
    </div>
  )
}

export default NhienLieuDauVaoIndex
