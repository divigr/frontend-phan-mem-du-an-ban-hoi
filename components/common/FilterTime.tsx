import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  .react-datepicker__input-container {
    border: 2px solid red;
  }
`

const FilterLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
`

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

interface FilterProps {
  status: 'year' | 'month' | 'day' // Filter type
  onFilterChange: (status: string, value: string | null) => void // Value is always a string or null
}

const Filter: React.FC<FilterProps> = ({ status, onFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    console.log('Selected Date:', date)

    if (status === 'year') {
      const year = date ? date.getFullYear().toString() : null
      console.log('Year:', year)
      onFilterChange(status, year)
    } else if (status === 'month') {
      const year = date ? date.getFullYear().toString() : null
      const month = date ? (date.getMonth() + 1).toString().padStart(2, '0') : null
      const formattedMonth = year && month ? `${year}-${month}` : null
      console.log('Month:', formattedMonth)
      onFilterChange(status, formattedMonth)
    } else if (status === 'day') {
      const formattedDate = date ? moment(date).format('YYYY-MM-DD') : null
      console.log('Day:', formattedDate)
      onFilterChange(status, formattedDate)
    }
  }

  const resetFilter = () => {
    setSelectedDate(null)
    onFilterChange(status, null)
  }

  return (
    <FilterContainer>
      {status === 'year' && (
        <div>
          <FilterLabel>Chọn năm:</FilterLabel>
          <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat='yyyy' showYearPicker placeholderText='Chọn năm' isClearable />
        </div>
      )}
      {status === 'month' && (
        <div>
          <FilterLabel>Chọn tháng:</FilterLabel>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat='MM/yyyy'
            showMonthYearPicker
            placeholderText='Chọn tháng'
            isClearable
          />
        </div>
      )}
      {status === 'day' && (
        <div>
          <FilterLabel>Chọn ngày:</FilterLabel>
          <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat='dd/MM/yyyy' placeholderText='Chọn ngày' isClearable />
        </div>
      )}
      <FilterButton onClick={resetFilter}>Xóa Bộ Lọc</FilterButton>
    </FilterContainer>
  )
}

export default Filter
