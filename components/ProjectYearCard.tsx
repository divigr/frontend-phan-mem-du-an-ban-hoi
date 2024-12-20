import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Title = styled.h3`
  margin: 0;
  color: #333;
  font-size: 20px;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`

const Button = styled.button<{ isSelected?: boolean }>`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ isSelected }) => (isSelected ? '#007bff' : '#f0f0f0')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#0056b3' : '#ddd')};
  }
`

const Message = styled.p`
  font-style: italic;
  color: #888;
  text-align: center;
`

const YearMonthFilter: React.FC = () => {
  const router = useRouter()
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])
  const [filterType, setFilterType] = useState<string | null>(null)

  const loId = router.query.loId as string

  const years = Array.from({ length: 7 }, (_, i) => 2024 + i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const quarters = [1, 2, 3, 4]

  const handleYearSelect = (year: number) => {
    setSelectedYear(year)
    setSelectedMonths([]) // Reset months when a new year is selected
    setFilterType(null)
  }

  const handleMonthToggle = (month: number) => {
    setFilterType('thang')
    if (selectedMonths.includes(month)) {
      // Remove the month if already selected
      setSelectedMonths(selectedMonths.filter((m) => m !== month))
    } else {
      // Add the month if not selected
      setSelectedMonths([...selectedMonths, month])
    }
  }

  const applyMonthFilter = () => {
    if (selectedYear && loId) {
      router.push({
        pathname: '/bao-cao',
        query: {
          filterType: 'thang',
          nam: selectedYear,
          months: selectedMonths.join(','), // Convert array to comma-separated string
          loId: loId,
        },
      })
    } else {
      console.error('loId hoặc năm không hợp lệ.')
    }
  }

  const handleQuarterSelect = (quarter: number) => {
    setFilterType('quy')
    setSelectedMonths([]) // Reset months when a quarter is selected
    if (selectedYear && loId) {
      router.push({
        pathname: '/bao-cao',
        query: {
          filterType: 'quy',
          nam: selectedYear,
          quy: quarter,
          loId: loId,
        },
      })
    } else {
      console.error('loId hoặc năm không hợp lệ.')
    }
  }

  const handleYearlySelect = () => {
    setFilterType('nam')
    setSelectedMonths([])
    if (selectedYear && loId) {
      router.push({
        pathname: '/bao-cao',
        query: {
          filterType: 'nam',
          nam: selectedYear,
          loId: loId,
        },
      })
    } else {
      console.error('loId hoặc năm không hợp lệ.')
    }
  }

  return (
    <Container>
      <Section>
        <Title>Chọn Năm</Title>
        <ButtonContainer>
          {years.map((year) => (
            <Button key={year} onClick={() => handleYearSelect(year)} isSelected={selectedYear === year}>
              {year}
            </Button>
          ))}
        </ButtonContainer>
      </Section>

      {selectedYear && (
        <>
          <Section>
            <Title>Chọn Tháng</Title>
            <ButtonContainer>
              {months.map((month) => (
                <Button key={month} onClick={() => handleMonthToggle(month)} isSelected={filterType === 'thang' && selectedMonths.includes(month)}>
                  Tháng {month}
                </Button>
              ))}
            </ButtonContainer>
            {selectedMonths.length > 0 && (
              <Button onClick={applyMonthFilter} isSelected={false}>
                Áp Dụng Tháng
              </Button>
            )}
          </Section>

          <Section>
            <Title>Chọn Quý</Title>
            <ButtonContainer>
              {quarters.map((quarter) => (
                <Button key={quarter} onClick={() => handleQuarterSelect(quarter)} isSelected={filterType === 'quy'}>
                  Quý {quarter}
                </Button>
              ))}
            </ButtonContainer>
          </Section>

          <Section>
            <Title>Toàn Bộ Năm</Title>
            <ButtonContainer>
              <Button onClick={handleYearlySelect} isSelected={filterType === 'nam'}>
                Năm {selectedYear}
              </Button>
            </ButtonContainer>
          </Section>
        </>
      )}

      {!selectedYear && <Message>Hãy chọn năm trước.</Message>}
    </Container>
  )
}

export default YearMonthFilter
