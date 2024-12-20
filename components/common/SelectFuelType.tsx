// components/common/SelectFuelType.tsx

import React from 'react'

interface SelectFuelTypeProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

const SelectFuelType: React.FC<SelectFuelTypeProps> = ({ value, onChange, disabled = false }) => {
  return (
    <fieldset>
      <label>Loại Nhiên Liệu</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} required>
        <option value=''>Chọn loại nhiên liệu</option>
        <option value='củi băm'>Củi băm</option>
        <option value='mùn cưa'>Mùn cưa</option>
        <option value='rác xô'>Rác xô</option>
        <option value='than indo'>Than Indo</option>
      </select>
    </fieldset>
  )
}

export default SelectFuelType
