import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { addShift, updateShift } from '../../redux/slices/boilerSliceManagement'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Fieldset = styled.fieldset`
  margin-bottom: 15px;
  border: none;
`

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #555;
  margin-bottom: 5px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

const AddShiftForBoiler = () => {
  const [boilerId, setBoilerId] = useState('')
  const [ca, setCa] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [soLuongHoi, setSoLuongHoi] = useState('')
  const [soLuongDien, setSoLuongDien] = useState('')
  const [hoaChat, setHoaChat] = useState('')
  const [muoi, setMuoi] = useState('')
  const [nhienLieu, setNhienLieu] = useState('')
  const [dau_do, setDauDo] = useState('')

  const router = useRouter()
  const dispatch = useDispatch()

  const { id } = router.query

  const boilerShifts = useSelector((state: RootState) => state.boiler.shifts)
  const boilerInfo = useSelector((state: RootState) => state.boilerInfo.boilers)

  // Load shift data when editing
  useEffect(() => {
    if (id) {
      const shiftToEdit = boilerShifts.find((shift) => shift.id === id)
      if (shiftToEdit) {
        setBoilerId(shiftToEdit.boilerId)
        setCa(shiftToEdit.ca)
        setDateTime(shiftToEdit.dateTime)
        setSoLuongHoi(shiftToEdit.soLuongHoi)
        setSoLuongDien(shiftToEdit.soLuongDien)
        setHoaChat(shiftToEdit.hoaChat)
        setMuoi(shiftToEdit.muoi)
        setNhienLieu(shiftToEdit.nhienLieu)
        setDauDo(shiftToEdit.dau_do)
      }
    }
  }, [id, boilerShifts])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const dataShift = {
      id: id || uuidv4(),
      boilerId,
      ca,
      dateTime,
      soLuongHoi,
      soLuongDien,
      hoaChat,
      muoi,
      nhienLieu,
      dau_do,
    }

    const shiftId = Array.isArray(id) ? id[0] : id

    if (typeof shiftId === 'string') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...restOfShiftData } = dataShift
      dispatch(updateShift({ id: shiftId, ...restOfShiftData }))
    } else {
      // Add a new shift if no id exists
      dispatch(addShift(dataShift))
    }

    // Redirect to the shift management page after submission
    router.push('/thong-tin-lo/quan-ly-lo')
  }

  return (
    <Container>
      <Title>{id ? 'Cập Nhập Thông Tin Quản Lý Ca' : 'Thêm Thông Tin Quản Lý Ca'}</Title>
      <Form onSubmit={handleSubmit}>
        {/* Select the boiler */}
        <Fieldset>
          <Label>Chọn Lò</Label>
          <Select value={boilerId} onChange={(e) => setBoilerId(e.target.value)} required>
            <option value=''>Chọn Lò</option>
            {boilerInfo.map((boiler) => (
              <option key={boiler.id} value={boiler.id}>
                {boiler?.tenLo} - {boiler?.diaChiLo}
              </option>
            ))}
          </Select>
        </Fieldset>

        {/* Shift Details */}
        <Fieldset>
          <Label>Ca</Label>
          <Input type='text' value={ca} onChange={(e) => setCa(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Date and Time</Label>
          <Input type='datetime-local' value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Số Lượng Hơi</Label>
          <Input type='text' value={soLuongHoi} onChange={(e) => setSoLuongHoi(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Số Lượng Điện</Label>
          <Input type='text' value={soLuongDien} onChange={(e) => setSoLuongDien(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Hóa Chất</Label>
          <Input type='text' value={hoaChat} onChange={(e) => setHoaChat(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Muối</Label>
          <Input type='text' value={muoi} onChange={(e) => setMuoi(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>DO (Dissolved Oxygen)</Label>
          <Input type='text' value={dau_do} onChange={(e) => setDauDo(e.target.value)} required />
        </Fieldset>

        <Fieldset>
          <Label>Nhiên Liệu</Label>
          <Input type='text' value={nhienLieu} onChange={(e) => setNhienLieu(e.target.value)} required />
        </Fieldset>

        <Button type='submit'>{id ? 'Cập Nhập' : 'Gửi'}</Button>
      </Form>
    </Container>
  )
}

export default AddShiftForBoiler
