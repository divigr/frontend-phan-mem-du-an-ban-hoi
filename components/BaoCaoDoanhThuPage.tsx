import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorMessageComponent from './common/handleCommonError'
import { getDoanhThuChiPhiLoiNhuan } from '../services/baoCaoService'
import styled from 'styled-components'

const BaoCaoDoanhThu: React.FC = () => {
  const router = useRouter()
  const { loId, filterType, months, projectName } = router.query
  const queryNam = router.query.nam
  const [data, setData] = useState<unknown>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [nam, setNam] = useState<number>(Number(queryNam) || new Date().getFullYear())

  const fetchData = async (selectedYear: number) => {
    if (!loId || !filterType) {
      setErrorMessage('Thiếu thông tin cần thiết: loId hoặc filterType.')
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      const query = {
        loId: loId as string,
        nam: selectedYear,
        filterType: filterType as string,
        ...(filterType === 'thang' && months ? { months } : {}),
      }

      const response = await getDoanhThuChiPhiLoiNhuan(query)

      if (response?.message === 'Không tìm thấy dữ liệu vận hành.') {
        setData(null) // Set data to null if the specific message is returned
        setErrorMessage(null) // Clear error message
        return
      }

      const defaultMonths = Array.from({ length: 12 }, (_, index) => ({
        _id: { month: index + 1, year: selectedYear },
        tongSanLuongHoi: 0,
        doanhThu: 0,
        tongChiPhi: 0,
        loiNhuan: 0,
      }))

      const chiTiet = defaultMonths.map((monthData) => {
        const matchedData = response.data?.chiTiet?.find((item: unknown) => item._id.month === monthData._id.month)
        return matchedData || monthData
      })

      setData({ ...response.data, chiTiet })
      setErrorMessage(null)
    } catch (error: unknown) {
      if (error.response?.data?.message === 'Không tìm thấy dữ liệu vận hành.') {
        setData(null)
        setErrorMessage(null)
      } else {
        setErrorMessage('Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData(nam)
  }, [loId, filterType, months, nam])

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = Number(event.target.value)
    setNam(selectedYear)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, nam: selectedYear },
    })
  }

  const handleClick = (month: number | null) => {
    const query = month
      ? { loId, nam, filterType: 'thang', months: month, projectName }
      : {
          loId,
          nam,
          filterType: 'thang',
          months: data?.chiTiet?.map((item: unknown) => item._id.month).join(','),
          projectName,
        }
    router.push({
      pathname: '/bao-cao-chi-tiet',
      query,
    })
  }

  if (isLoading) return <p>Đang tải dữ liệu...</p>

  return (
    <Wrapper>
      <ErrorMessageComponent errorMessage={errorMessage} setErrorMessage={setErrorMessage} />

      <YearFilter>
        <label htmlFor='yearSelect'>Lọc theo năm:</label>
        <select id='yearSelect' value={nam} onChange={handleYearChange}>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </YearFilter>

      {data ? (
        <Table>
          <thead>
            <tr>
              <th onClick={() => handleClick(null)}>Tổng</th>
              <th>Sản Lượng Hơi</th>
              <th>Doanh Thu</th>
              <th>Chi Phí</th>
              <th>Lợi Nhuận</th>
            </tr>
          </thead>
          <tbody>
            {data.chiTiet.map((item: unknown, index: number) => (
              <tr key={index} onClick={() => handleClick(item._id.month)}>
                <td>{`Tháng ${item._id.month} - ${item._id.year}`}</td>
                <td>{item.tongSanLuongHoi.toLocaleString()}</td>
                <td>{item.doanhThu.toLocaleString()} VND</td>
                <td>{item.tongChiPhi.toLocaleString()} VND</td>
                <td
                  style={{
                    color: item.loiNhuan >= 0 ? 'green' : 'red',
                  }}>
                  {item.loiNhuan.toLocaleString()} VND
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr onClick={() => handleClick(null)}>
              <td>
                <strong>Tổng Cộng</strong>
              </td>
              <td>{data.tongCong?.tongSanLuongHoi?.toLocaleString() || '0'}</td>
              <td>{data.tongCong?.doanhThu?.toLocaleString() || '0'} VND</td>
              <td>{data.tongCong?.tongChiPhi?.toLocaleString() || '0'} VND</td>
              <td
                style={{
                  color: (data.tongCong?.loiNhuan || 0) >= 0 ? 'green' : 'red',
                }}>
                {data.tongCong?.loiNhuan?.toLocaleString() || '0'} VND
              </td>
            </tr>
          </tfoot>
        </Table>
      ) : (
        <NoDataMessage>Không có dữ liệu cho năm {nam}</NoDataMessage>
      )}
    </Wrapper>
  )
}

export default BaoCaoDoanhThu

const Wrapper = styled.div`
  padding: 20px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    cursor: pointer;
  }

  th {
    background-color: #f2f2f2;
    text-align: center;
  }

  td {
    color: #333;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`

const YearFilter = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
    font-weight: bold;
  }

  select {
    padding: 5px;
    font-size: 16px;
  }
`

const NoDataMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  color: #666;
  font-size: 18px;
`

const ErrorMessage = styled.div`
  background-color: #ffe6e6;
  border: 1px solid #ff9999;
  color: #cc0000;
  padding: 10px;
  margin: 20px 0;
  text-align: center;
  border-radius: 4px;
`
