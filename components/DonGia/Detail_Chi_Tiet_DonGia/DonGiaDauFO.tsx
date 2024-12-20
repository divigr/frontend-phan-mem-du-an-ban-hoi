import React, { useState, useEffect } from 'react'
import SharedTable from '../../common/SharedTable'
import { calculateProjectDataByMonth } from '../../../services/donGiaService'
import { formatDateToGMT7 } from '../../common/TimeZone'

interface Props {
  projectId?: string | string[]
  filterDate: string | null
}

const DonGiaDauFO: React.FC<Props> = ({ projectId, filterDate }) => {
  const [tableData, setTableData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const limit = 7

  const loadData = async (append = false) => {
    if (!projectId || typeof projectId !== 'string') return

    setLoading(true)
    try {
      const body = {
        month: filterDate || new Date().toISOString().slice(0, 7),
        limit,
        offset,
        dauFO: true,
      }

      const response = await calculateProjectDataByMonth(projectId, body)

      const newData = response.data || []
      const formattedData = newData
        .filter((item: any) => Array.isArray(item.luongDauFO))
        .flatMap((item: any) =>
          item.luongDauFO.map((dauFO: any) => ({
            ngay: formatDateToGMT7(item.ngay),
            status: item.status,
            ...dauFO,
          }))
        )

      if (append) {
        setTableData((prev) => [...prev, ...formattedData])
      } else {
        setTableData(formattedData)
      }

      setHasMore(newData.length === limit) // If less than limit, no more data
    } catch (error) {
      console.error('Error loading data:', error)
      setTableData([])
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit)
  }

  useEffect(() => {
    setOffset(0) // Reset offset on filter change
    loadData(false)
  }, [filterDate])

  useEffect(() => {
    if (offset > 0) {
      loadData(true)
    }
  }, [offset])

  return (
    <div>
      <SharedTable
        columns={[
          { key: 'ngay', label: 'Ngày' },
          { key: 'status', label: 'Trạng Thái' },
          { key: 'chiSoDau', label: 'Chỉ Số Đầu' },
          { key: 'chiSoCuoi', label: 'Chỉ Số Cuối' },
          { key: 'luongTieuThu', label: 'Lượng Tiêu Thụ (Lít)' },
          { key: 'donGia', label: 'Đơn Giá (VND)' },
          { key: 'thanhTien', label: 'Thành Tiền (VND)' },
        ]}
        data={tableData}
        loading={loading}
      />
      {!loading && hasMore && tableData.some((item) => item.dauFo.length > 0) && (
        <button
          onClick={loadMore}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default DonGiaDauFO
