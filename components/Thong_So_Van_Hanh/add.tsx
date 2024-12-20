import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { createThongSoVanHanh, updateThongSoVanHanh, getThongSoVanHanhTheoLo } from '../../services/thongSoDauVaoService'
import { ConsumptionWithDongHo, ConsumptionWithoutDongHo, ThongSoVanHanh } from '../../models/ThongSoVanHanh'
import SelectFuelType from '../common/SelectFuelType'

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

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #555;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
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
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`

const FuelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`

const AddOperationalParameter = ({ thongSoVanHanh }: { thongSoVanHanh?: ThongSoVanHanh | null }) => {
  const router = useRouter()
  const { id, loId: loIdFromQuery, date: dateFromQuery, projectName } = router.query

  const [projectId, setProjectId] = useState<string>(thongSoVanHanh?.projectId || (loIdFromQuery as string) || '')
  const [ngay, setNgay] = useState<string>(
    thongSoVanHanh ? thongSoVanHanh.ngay.split('T')[0] : (dateFromQuery as string) || new Date().toISOString().split('T')[0]
  )
  const [ca, setCa] = useState<number>(thongSoVanHanh?.ca || 1)
  const [hoaChat, setHoaChat] = useState<number>(thongSoVanHanh?.hoaChat || 0)
  const [muoi, setMuoi] = useState<number>(thongSoVanHanh?.muoi || 0)
  const [dauDo, setDauDo] = useState<number>(thongSoVanHanh?.dauDo || 0)
  const [trangThai, setTrangThai] = useState<number>(thongSoVanHanh?.trangThai || 1)
  const [capNhatChiSoMoi, setCapNhatChiSoMoi] = useState<boolean>(false)

  const [luongHoi, setLuongHoi] = useState<ConsumptionWithDongHo[]>(thongSoVanHanh?.luongHoi || [])
  const [dienNang, setDienNang] = useState<ConsumptionWithoutDongHo[]>(thongSoVanHanh?.dienNang || [])
  const [nuocNong, setNuocNong] = useState<ConsumptionWithoutDongHo[]>(thongSoVanHanh?.nuocNong || [])
  const [nuocLanh, setNuocLanh] = useState<ConsumptionWithoutDongHo[]>(thongSoVanHanh?.nuocLanh || [])
  const [dauFo, setDauFo] = useState<ConsumptionWithDongHo[]>(thongSoVanHanh?.dauFo || [])

  const [nhienLieuTonKho, setNhienLieuTonKho] = useState<{ loaiNhienLieu: string; soLuong: number }[]>([])

  useEffect(() => {
    if (ngay) {
      const newQuery = { ...router.query, date: ngay }
      router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true })
    }
  }, [ngay])

  useEffect(() => {
    if (id) {
      const fetchOperationalParameter = async () => {
        try {
          const data = await getThongSoVanHanhTheoLo(id as string)
          setProjectId(data.projectId)
          setNgay(data.ngay.split('T')[0])
          setCa(data.ca)
          setHoaChat(data.hoaChat)
          setMuoi(data.muoi)
          setDauDo(data.dauDo)
          setTrangThai(data.trangThai)
          setLuongHoi(data.luongHoi || { chiSoCuoi: 0 })
          setDienNang(data.dienNang || { chiSoCuoi: 0 })
          setNuocNong(data.nuocNong || { chiSoCuoi: 0 })
          setNuocLanh(data.nuocLanh || { chiSoCuoi: 0 })
          setNhienLieuTonKho(data.nhienLieuTonKho || [])
        } catch (error) {
          console.error('Error fetching operational parameter:', error)
        }
      }
      fetchOperationalParameter()
    }
  }, [id])

  const handleAddFuel = () => {
    setNhienLieuTonKho([...nhienLieuTonKho, { loaiNhienLieu: '', soLuong: 0 }])
  }

  const handleFuelChange = (index: number, field: string, value: string | number) => {
    const updatedFuel = nhienLieuTonKho.map((fuel, i) => (i === index ? { ...fuel, [field]: value } : fuel))
    setNhienLieuTonKho(updatedFuel)
  }

  const handleRemoveFuel = (index: number) => {
    const updatedFuel = nhienLieuTonKho.filter((_, i) => i !== index)
    setNhienLieuTonKho(updatedFuel)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare the payload
    const requestPayload = {
      projectId,
      ca,
      ngay: dateFromQuery,
      luongHoi,
      dienNang,
      nuocNong,
      nuocLanh,
      hoaChat,
      muoi,
      dauDo,
      dauFo,
      nhienLieuTonKho,
      trangThai,
      capNhatChiSoMoi,
    }

    try {
      if (id) {
        // Update existing record
        await updateThongSoVanHanh(id as string, requestPayload)
      } else {
        // Create new record
        await createThongSoVanHanh(requestPayload)
      }
      console.log('ss')

      router.push(`/thong-tin-lo/quan-ly-lo/thong-so-van-hanh/view?loId=${projectId}&projectName=${projectName}&date=${dateFromQuery}`)
    } catch (error) {
      console.error('Error submitting operational parameter:', error)
    }
  }

  const InputField = ({ label, value, onChange, type = 'number', placeholder }: unknown) => (
    <>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </>
  )

  const NumericInputField = ({ label, value, onChange, isStart = false }: unknown) => (
    <>
      <Label>{label}</Label>
      {capNhatChiSoMoi && <Input type='number' placeholder={`Chỉ số ${isStart ? 'đầu' : 'cuối'}`} value={value} onChange={onChange} />}
    </>
  )

  return (
    <Container>
      <Title>
        {id ? 'Cập Nhật Thông Số Vận Hành' : 'Thêm Thông Số Vận Hành'} - {projectName}
      </Title>
      <Form onSubmit={handleSubmit}>
        <InputField label='Ngày' value={ngay} onChange={(e) => setNgay(e.target.value)} type='date' required />

        <Label>Ca</Label>
        <Select value={ca} onChange={(e) => setCa(Number(e.target.value))}>
          <option value={1}>Ca 1 (6h-14h)</option>
          <option value={2}>Ca 2 (14h-22h)</option>
          <option value={3}>Ca 3 (22h-6h)</option>
        </Select>

        <ToggleContainer>
          <Label>Nhập Chỉ Số Đầu</Label>
          <Input type='checkbox' checked={capNhatChiSoMoi} onChange={() => setCapNhatChiSoMoi(!capNhatChiSoMoi)} />
        </ToggleContainer>

        <NumericInputField
          label='Lượng Hơi'
          value={luongHoi.chiSoCuoi}
          onChange={(e) => setLuongHoi({ ...luongHoi, chiSoCuoi: Number(e.target.value) })}
          isStart={true}
        />
        <NumericInputField
          label='Điện Năng'
          value={dienNang.chiSoCuoi}
          onChange={(e) => setDienNang({ ...dienNang, chiSoCuoi: Number(e.target.value) })}
          isStart={true}
        />
        <NumericInputField
          label='Nước Nóng'
          value={nuocNong.chiSoCuoi}
          onChange={(e) => setNuocNong({ ...nuocNong, chiSoCuoi: Number(e.target.value) })}
          isStart={true}
        />
        <NumericInputField
          label='Nước Lạnh'
          value={nuocLanh.chiSoCuoi}
          onChange={(e) => setNuocLanh({ ...nuocLanh, chiSoCuoi: Number(e.target.value) })}
          isStart={true}
        />

        <InputField label='Hóa Chất' value={hoaChat} onChange={(e) => setHoaChat(Number(e.target.value))} />
        <InputField label='Muối' value={muoi} onChange={(e) => setMuoi(Number(e.target.value))} />
        <InputField label='Dầu DO' value={dauDo} onChange={(e) => setDauDo(Number(e.target.value))} />
        <InputField label='Dầu FO' value={dauFo} onChange={(e) => setDauFo(Number(e.target.value))} />

        <Label>Nhiên Liệu Tồn Kho</Label>
        {nhienLieuTonKho.map((fuel, index) => (
          <FuelContainer key={index}>
            <SelectFuelType value={fuel.loaiNhienLieu} onChange={(value) => handleFuelChange(index, 'loaiNhienLieu', value)} />
            <Input
              type='number'
              placeholder='Số Lượng'
              value={fuel.soLuong}
              onChange={(e) => handleFuelChange(index, 'soLuong', Number(e.target.value))}
            />
            <Button type='button' onClick={() => handleRemoveFuel(index)}>
              Xóa
            </Button>
          </FuelContainer>
        ))}
        <Button type='button' onClick={handleAddFuel}>
          + Thêm Nhiên Liệu
        </Button>

        <Label>Trạng Thái</Label>
        <Select value={trangThai} onChange={(e) => setTrangThai(Number(e.target.value))}>
          <option value={1}>Nháp</option>
          <option value={2}>Đã Public</option>
          <option value={3}>Không Được Duyệt</option>
        </Select>

        <Button type='submit'>{id ? 'Cập Nhật' : 'Gửi'}</Button>
      </Form>
    </Container>
  )
}

export default AddOperationalParameter
