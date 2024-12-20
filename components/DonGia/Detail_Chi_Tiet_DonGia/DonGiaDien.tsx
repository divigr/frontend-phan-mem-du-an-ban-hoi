import React, { useState, useEffect } from 'react'
import SharedTable from '../../common/SharedTable'
import { calculateProjectDataByMonth } from '../../../services/donGiaService'
import { formatDateToGMT7 } from '../../common/TimeZone'

interface Props {
  projectId?: string | string[]
  filterDate: string | null
}

const DonGiaDien: React.FC<Props> = ({ projectId, filterDate }) => {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const limit = 7

  const loadData = async (append = false) => {
    if (!projectId || typeof projectId !== 'string') return

    setLoading(true)
    try {
      const body = {
        month: filterDate || new Date().toISOString().slice(0, 7),
        limit,
        offset,
        dienNang: true,
      }

      const response = await calculateProjectDataByMonth(projectId, body)

      const newData = response.data || []
      if (append) {
        setData((prev) => [...prev, ...newData])
      } else {
        setData(newData) // Reset data if not appending
      }
      setHasMore(newData.length === limit) // If less than limit, no more data
    } catch (error) {
      console.error('Error loading data:', error)
      setData([]) // Clear the table data on error
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
          { key: 'chiSoDau', label: 'Chỉ Số Đầu' },
          { key: 'chiSoCuoi', label: 'Chỉ Số Cuối' },
          { key: 'luongSuDung', label: 'Lượng Tiêu Thụ (KW)' },
          { key: 'donGia', label: 'Đơn Giá (VND)' },
          { key: 'thanhTien', label: 'Thành Tiền (VND)' },
        ]}
        data={data.flatMap(
          (item) =>
            item.dienNang?.map((dien: any) => ({
              ngay: formatDateToGMT7(item.ngay),
              status: item.status,
              ...dien,
            })) || []
        )}
        loading={loading}
      />
      {!loading && hasMore && data.some((item) => item.dienNang.length > 0) && (
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

export default DonGiaDien
