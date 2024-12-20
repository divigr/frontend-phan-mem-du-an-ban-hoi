import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const DetailGiaTriChiTiet = ({
  data,
  loading,
  metric,
  monthDays = 31, // Default to 31 days
}: {
  data: unknown
  loading: boolean
  metric: string
  monthDays?: number
}) => {
  const [visibleDays, setVisibleDays] = useState<number>(7) // Show 7 days initially
  const router = useRouter()

  const keyLabels: { [key: string]: string } = {
    chiSoCuoi: 'Chỉ Số Cuối',
    sanLuongHoi: 'Sản Lượng Hơi',
    donGia: 'Đơn Giá',
    doanhThuCoDinh: 'Doanh Thu Cố Định',
    doanhThu: 'Doanh Thu',
    sanLuongDien: 'Sản Lượng Điện',
    chiPhiDienNang: 'Chi Phí Điện Năng',
    sanLuongNuocNong: 'Sản Lượng Nước Nóng',
    chiPhiNuocNong: 'Chi Phí Nước Nóng',
    sanLuongNuocLanh: 'Sản Lượng Nước Lạnh',
    chiPhiNuocLanh: 'Chi Phí Nước Lạnh',
    sanLuongHoaChat: 'Sản Lượng Hóa Chất',
    chiPhiHoaChat: 'Chi Phí Hóa Chất',
    sanLuongMuoi: 'Sản Lượng Muối',
    chiPhiMuoi: 'Chi Phí Muối',
    sanLuongDauDO: 'Sản Lượng Dầu DO',
    chiPhiDauDO: 'Chi Phí Dầu DO',
    sanLuongDauFO: 'Sản Lượng Dầu FO',
    chiPhiDauFO: 'Chi Phí Dầu FO',
  }

  const handleBack = () => {
    const { loId, nam, thang, projectName } = router.query

    router.push(`/bao-cao-chi-tiet?loId=${loId}&nam=${nam}&filterType=thang&months=${thang}&projectName=${projectName}`)
  }

  if (loading) return <p>Loading...</p>
  if (!data) return <p>Không có dữ liệu để hiển thị.</p>

  const buildDaysData = () => {
    const daysData = []
    for (let day = 1; day <= monthDays; day++) {
      const found = data?.find((item: unknown) => item.ngay === day)
      daysData.push(
        found || {
          ngay: day,
          ...Object.keys(data[0] || {}).reduce((acc, key) => {
            if (key !== 'ngay') acc[key] = 0
            return acc
          }, {}),
        }
      )
    }
    return daysData
  }

  const displayedData = buildDaysData().slice(0, visibleDays)

  const calculateTotals = () => {
    return buildDaysData().reduce((totals, day) => {
      Object.keys(day).forEach((key) => {
        if (key !== 'ngay') {
          totals[key] = (totals[key] || 0) + day[key]
        }
      })
      return totals
    }, {})
  }

  const totals = calculateTotals()

  const handleLoadMore = () => {
    setVisibleDays((prev) => Math.min(prev + 7, monthDays))
  }

  return (
    <Wrapper>
      <Header>
        <h2>Chi Tiết: {keyLabels[metric] || metric}</h2>
        <BackButton onClick={handleBack}>Quay lại</BackButton>
      </Header>
      <ScrollableTable>
        <table>
          <thead>
            <tr>
              <th className='fixed'>Ngày</th>
              {Object.keys(displayedData[0] || {})
                .filter((key) => key !== 'ngay')
                .map((key) => (
                  <th key={key}>{keyLabels[key] || key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item: unknown) => (
              <tr key={item.ngay}>
                <td className='fixed'>Ngày {item.ngay}</td>
                {Object.keys(item)
                  .filter((key) => key !== 'ngay')
                  .map((key) => (
                    <td key={key}>{item[key]?.toLocaleString() || 0}</td>
                  ))}
              </tr>
            ))}
            <tr>
              <td className='fixed'>
                <strong>Tổng cộng</strong>
              </td>
              {Object.keys(totals)
                .filter((key) => key !== 'ngay')
                .map((key) => (
                  <td key={key}>
                    <strong>{totals[key]?.toLocaleString()}</strong>
                  </td>
                ))}
            </tr>
          </tbody>
        </table>
      </ScrollableTable>
      {visibleDays < monthDays && <LoadMoreButton onClick={handleLoadMore}>Tải thêm</LoadMoreButton>}
    </Wrapper>
  )
}

export default DetailGiaTriChiTiet

// Styled Components
const Wrapper = styled.div`
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
  }
`

const ScrollableTable = styled.div`
  overflow-x: auto;
  width: 100%;
  margin-top: 20px;

  table {
    width: 200%; /* Ensure the table width adjusts based on its content */
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: center;
      white-space: nowrap; /* Prevent wrapping of content */
    }

    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    tr:hover {
      background-color: #f9f9f9; /* Add hover effect */
    }

    .fixed {
      position: sticky; /* Keep the first column fixed */
      left: 0;
      background-color: #f2f2f2; /* Same as header to visually separate */
      z-index: 1; /* Ensure it stays on top */
    }
  }
`

const LoadMoreButton = styled.button`
  margin: 20px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

const BackButton = styled.button`
  padding: 10px 15px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`
