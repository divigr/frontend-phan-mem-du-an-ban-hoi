import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getDoanhThuChiPhiLoiNhuanByNgay } from '../services/baoCaoService'
import ErrorMessageComponent from './common/handleCommonError'
import Header from './common/Header'

const BaoCaoChiTiet = () => {
  const router = useRouter()
  const { loId, nam, filterType, months, projectName } = router.query

  const [data, setData] = useState<unknown>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [visibleDays, setVisibleDays] = useState<number>(7) // Initial number of days to show
  const [daysInMonth, setDaysInMonth] = useState<number>(30)

  const [selectedYear, setSelectedYear] = useState<string>(nam?.toString() || new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState<string>(months?.toString() || (new Date().getMonth() + 1).toString())

  useEffect(() => {
    const year = parseInt(selectedYear, 10)
    const month = parseInt(selectedMonth, 10)
    setDaysInMonth(new Date(year, month, 0).getDate())
  }, [selectedYear, selectedMonth])

  useEffect(() => {
    const fetchData = async () => {
      if (!loId || !selectedYear || !filterType) return

      try {
        setIsLoading(true)

        const query = {
          loId: loId as string,
          nam: parseInt(selectedYear, 10),
          thang: selectedMonth,
        }

        const response = await getDoanhThuChiPhiLoiNhuanByNgay(query)

        if (!response || !response.data || response.data.message === 'Không tìm thấy dữ liệu phù hợp.') {
          throw new Error(response?.data?.message || 'Không tìm thấy dữ liệu.')
        }

        setData(response.data)
        setErrorMessage(null)
      } catch (error: unknown) {
        console.error('Error fetching detailed data:', error)
        setData(null)
        setErrorMessage(error.message || 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [loId, selectedYear, selectedMonth, filterType])

  const FIELD_MAPPING: Record<string, string> = {
    doanhThu: 'Doanh thu',
    'chiPhiChiTiet.chiPhiDienNang': 'Chi phí điện năng',
    'chiPhiChiTiet.chiPhiNuocLanh': 'Chi phí nước lạnh',
    'chiPhiChiTiet.chiPhiNuocNong': 'Chi phí nước nóng',
    'chiPhiChiTiet.chiPhiHoaChat': 'Chi phí hóa chất',
    'chiPhiChiTiet.chiPhiMuoi': 'Chi phí muối',
    'chiPhiChiTiet.chiPhiDauDO': 'Chi phí dầu DO',
    'chiPhiChiTiet.chiPhiDauFO': 'Chi phí dầu FO',
  }

  const FIXED_COST_MAPPING: Record<string, string> = {
    chiPhiLuongNhanCong: 'Chi phí lương nhân công',
    chiPhiKhauHao: 'Chi phí khấu hao',
    chiPhiPhanBo: 'Chi phí phân bổ',
    chiPhiLaiVay: 'Chi phí lãi vay',
    chiPhiSuaChuaBaoTri: 'Chi phí sửa chữa bảo trì',
    chiPhiCongTac: 'Chi phí công tác',
    chiPhiKhac: 'Chi phí khác',
    chiPhiBHXH: 'Chi phí BHXH',
  }

  const buildDaysData = () => {
    const daysData = []
    for (let day = 1; day <= visibleDays; day++) {
      const found = data?.chiTiet?.find((item: unknown) => item.ngay === day)
      daysData.push(
        found || {
          ngay: day,
          doanhThu: 0,
          tongChiPhiTieuThu: 0,
          chiPhiChiTiet: Object.keys(FIELD_MAPPING).reduce((acc, key) => {
            acc[key.split('.').pop() || key] = 0
            return acc
          }, {}),
        }
      )
    }
    return daysData
  }

  const calculateTotals = () => {
    const daysData = buildDaysData()
    return daysData.reduce((totals, day) => {
      Object.keys(FIELD_MAPPING).forEach((field) => {
        const keys = field.split('.')
        const value = keys.reduce((obj, key) => obj?.[key], day) || 0
        totals[field] = (totals[field] || 0) + value
      })
      return totals
    }, {} as Record<string, number>)
  }

  const totals = calculateTotals()

  const handleLoadMore = () => {
    setVisibleDays((prev) => Math.min(prev + 7, daysInMonth))
  }

  const handleMetricClick = (metric: string) => {
    // Extract the part after the last dot
    const shortMetric = metric.split('.').pop() || metric

    const queryParams = new URLSearchParams({
      loId: loId as string,
      nam: selectedYear,
      thang: selectedMonth,
      projectName: projectName as string,
      metric: shortMetric, // Use the extracted metric
    }).toString()

    router.push(`/detail-chi-tiet?${queryParams}`)
  }

  return (
    <Wrapper>
      <Header
        projectName={projectName}
        title={`Báo Cáo Chi Tiết ${filterType === 'thang' && selectedMonth ? `Tháng ${selectedMonth}` : 'Tổng Cộng'}`}
      />
      <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

      <FilterWrapper>
        <label>
          Năm:
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            })}
          </select>
        </label>
        <label>
          Tháng:
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Tháng {i + 1}
              </option>
            ))}
          </select>
        </label>
      </FilterWrapper>

      <FixedCostTable>
        <table>
          <thead>
            <tr>
              <th>Loại Chi Phí Cố Định</th>
              <th>Giá Trị</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(FIXED_COST_MAPPING).map(([field, label]) => (
              <tr key={field}>
                <td>{label}</td>
                <td>
                  {data?.chiPhiCoDinh?.[field] !== undefined
                    ? typeof data.chiPhiCoDinh[field] === 'number'
                      ? data.chiPhiCoDinh[field].toLocaleString()
                      : data.chiPhiCoDinh[field]
                    : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FixedCostTable>

      <ScrollableTable>
        <table>
          <thead>
            <tr>
              <th className='fixed'>Ngày</th>
              {Object.keys(FIELD_MAPPING).map((field) => (
                <th key={field} onClick={() => handleMetricClick(field)}>
                  {FIELD_MAPPING[field]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {buildDaysData().map((item: unknown) => (
              <tr key={item.ngay}>
                <td className='fixed'>Ngày {item.ngay}</td>
                {Object.keys(FIELD_MAPPING).map((field) => {
                  const keys = field.split('.')
                  const value = keys.reduce((obj, key) => obj?.[key], item)
                  return (
                    <td key={`${item.ngay}-${field}`}>{value !== undefined ? (typeof value === 'number' ? value.toLocaleString() : value) : '0'}</td>
                  )
                })}
              </tr>
            ))}

            {data && (
              <tr>
                <td className='fixed'>
                  <strong>Tổng cộng</strong>
                </td>
                {Object.keys(FIELD_MAPPING).map((field) => {
                  const value = totals[field] || 0
                  return (
                    <td key={`tongCong-${field}`}>
                      <strong>{value.toLocaleString()}</strong>
                    </td>
                  )
                })}
              </tr>
            )}
          </tbody>
        </table>
      </ScrollableTable>
      {visibleDays < daysInMonth && <LoadMoreButton onClick={handleLoadMore}>Tải thêm</LoadMoreButton>}
    </Wrapper>
  )
}

export default BaoCaoChiTiet

const Wrapper = styled.div`
  padding: 20px;
`

const ScrollableTable = styled.div`
  overflow-x: auto;
  margin-top: 20px;
  cursor: pointer;

  table {
    width: 200%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
      white-space: nowrap;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f9f9f9;
    }
  }

  .fixed {
    position: sticky;
    left: 0;
    background-color: #f2f2f2;
    z-index: 1;
    text-align: left;
    width: 10px;
  }
`

const LoadMoreButton = styled.button`
  margin: 20px 0;
  display: block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`

const FixedCostTable = styled.div`
  margin: 20px 0;

  table {
    width: 100%;
    max-width: 20%;
    border: 1px solid #ddd;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      font-size: 1rem;
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  @media (max-width: 1024px) {
    table {
      width: 10%;
    }

    th,
    td {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.8rem;
    }
  }
`

const FilterWrapper = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 20px;
  }

  select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`
