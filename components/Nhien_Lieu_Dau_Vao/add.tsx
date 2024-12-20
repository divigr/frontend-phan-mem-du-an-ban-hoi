import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { FuelInput } from '../../models/FuelInput'
import { createFuelInput, updateFuelInput } from '../../services/nhienLieuDauVao'
import SelectFuelType from '../common/SelectFuelType'
import { getUserData, UserData } from '../../utils/authHelpers'

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
const Fieldset = styled.fieldset`
  margin-bottom: 15px;
  border: none;
`

const AddFuelInput = ({ fuelInput }: { fuelInput?: FuelInput | null }) => {
  const router = useRouter()
  const { loId: loIdFromQuery, date: dateFromQuery, projectName, stt } = router.query

  const userData: UserData | null = getUserData()

  const [loId, setLoId] = useState<string>(fuelInput?.loId || (loIdFromQuery as string) || '')
  const [ngay, setNgay] = useState<string>(
    fuelInput ? dayjs(fuelInput.ngay).format('YYYY-MM-DD') : (dateFromQuery as string) || new Date().toISOString().split('T')[0]
  )
  const [gioVao, setGioVao] = useState<string>(fuelInput?.gioVao || '')
  const [gioRa, setGioRa] = useState<string>(fuelInput?.gioRa || '')
  const [soPhieuCan, setSoPhieuCan] = useState<string>(fuelInput?.soPhieuCan || '')
  const [bienSoXe, setBienSoXe] = useState<string>(fuelInput?.bienSoXe || '')
  const [maLoaiHang, setMaLoaiHang] = useState<string>(fuelInput?.maLoaiHang || '')
  const [loaiNhienLieu, setLoaiNhienLieu] = useState<string>(fuelInput?.loaiNhienLieu || '')
  const [tenHang, setTenHang] = useState<string>(fuelInput?.tenHang || '')
  const [chatLuong, setChatLuong] = useState<string>(fuelInput?.chatLuong || '')
  const [khoiLuongTong, setKhoiLuongTong] = useState<number>(fuelInput?.khoiLuongTong || 0)
  const [khoiLuongXe, setKhoiLuongXe] = useState<number>(fuelInput?.khoiLuongXe || 0)
  const [doAm, setDoAm] = useState<number>(fuelInput?.doAm || 0)
  const [nguoiNhanHang, setNguoiNhanHang] = useState<string>(fuelInput?.nguoiNhanHang || '')
  const [nhaCungCap, setNhaCungCap] = useState<string>(fuelInput?.nhaCungCap || '')
  const [diaChiXuatHang, setDiaChiXuatHang] = useState<string>(fuelInput?.diaChiXuatHang || '')
  const [ghiChu, setGhiChu] = useState<string>(fuelInput?.ghiChu || '')
  const [trangThai, setTrangThai] = useState<number>(fuelInput?.trangThai || 1)
  const [soThuTuXe, setSoThuTuXe] = useState<number>(fuelInput?.soThuTuXe || Number(stt) || 1)
  const [tenNguoiNhap, setTenNguoiNhap] = useState<string>(fuelInput?.tenNguoiNhap || userData?.user.username || '')

  useEffect(() => {
    if (fuelInput) {
      setLoId(fuelInput.loId)
      setNgay(dayjs(fuelInput.ngay).format('YYYY-MM-DD'))
      setGioVao(fuelInput.gioVao)
      setGioRa(fuelInput.gioRa)
      setSoPhieuCan(fuelInput.soPhieuCan)
      setBienSoXe(fuelInput.bienSoXe)
      setMaLoaiHang(fuelInput.maLoaiHang)
      setLoaiNhienLieu(fuelInput.loaiNhienLieu)
      setTenHang(fuelInput.tenHang)
      setChatLuong(fuelInput.chatLuong)
      setKhoiLuongTong(fuelInput.khoiLuongTong)
      setKhoiLuongXe(fuelInput.khoiLuongXe)
      setDoAm(fuelInput.doAm)
      setNguoiNhanHang(fuelInput.nguoiNhanHang)
      setNhaCungCap(fuelInput.nhaCungCap)
      setDiaChiXuatHang(fuelInput.diaChiXuatHang)
      setGhiChu(fuelInput.ghiChu || '')
      setTrangThai(fuelInput.trangThai)
      setSoThuTuXe(fuelInput.soThuTuXe)
      setTenNguoiNhap(fuelInput.tenNguoiNhap)
    }
  }, [fuelInput])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const khoiLuongHang = khoiLuongTong - khoiLuongXe

    const newFuelInput = {
      loId,
      ngay,
      gioVao,
      gioRa,
      soPhieuCan,
      bienSoXe,
      maLoaiHang,
      loaiNhienLieu,
      tenHang,
      chatLuong,
      khoiLuongTong,
      khoiLuongXe,
      khoiLuongHang,
      doAm,
      nguoiNhanHang,
      nhaCungCap,
      diaChiXuatHang,
      ghiChu,
      trangThai,
      soThuTuXe,
      tenNguoiNhap,
    }

    try {
      if (fuelInput) {
        await updateFuelInput(fuelInput._id, newFuelInput)
      } else {
        await createFuelInput(newFuelInput)
      }
      router.push(`/thong-tin-lo/quan-ly-lo/nhien-lieu-dau-vao/view?loId=${loId}&date=${ngay}&projectName=${projectName}`)
    } catch (error) {
      console.error('Error submitting fuel input:', error)
    }
  }

  return (
    <Container>
      <Title>
        {fuelInput ? 'Cập Nhật Nhiên Liệu Đầu Vào' : 'Thêm Nhiên Liệu Đầu Vào'} - {projectName}
      </Title>
      <Form onSubmit={handleSubmit}>
        <Label>Ngày</Label>
        <Input type='date' value={ngay} onChange={(e) => setNgay(e.target.value)} required />
        <Label>Giờ Vào</Label>
        <Input type='time' value={gioVao} onChange={(e) => setGioVao(e.target.value)} required />
        <Label>Giờ Ra</Label>
        <Input type='time' value={gioRa} onChange={(e) => setGioRa(e.target.value)} required />
        <Label>Số Phiếu Cân</Label>
        <Input type='text' value={soPhieuCan} onChange={(e) => setSoPhieuCan(e.target.value)} required />
        <Label>Biển Số Xe</Label>
        <Input type='text' value={bienSoXe} onChange={(e) => setBienSoXe(e.target.value)} required />
        <Label>Mã Loại Hàng</Label>
        <Input type='text' value={maLoaiHang} onChange={(e) => setMaLoaiHang(e.target.value)} required />
        <Label>Loại Nhiên Liệu</Label>
        <SelectFuelType value={loaiNhienLieu} onChange={setLoaiNhienLieu} />
        <Label>Tên Hàng</Label>
        <Input type='text' value={tenHang} onChange={(e) => setTenHang(e.target.value)} required />
        <Label>Chất Lượng</Label>
        <Input type='text' value={chatLuong} onChange={(e) => setChatLuong(e.target.value)} required />
        <Label>Khối Lượng Tổng</Label>
        <Input type='number' value={khoiLuongTong} onChange={(e) => setKhoiLuongTong(Number(e.target.value))} required />
        <Label>Khối Lượng Xe</Label>
        <Input type='number' value={khoiLuongXe} onChange={(e) => setKhoiLuongXe(Number(e.target.value))} required />
        <Label>Độ Ẩm</Label>
        <Input type='number' value={doAm} onChange={(e) => setDoAm(Number(e.target.value))} required />
        <Label>Người Nhận Hàng</Label>
        <Input type='text' value={nguoiNhanHang} onChange={(e) => setNguoiNhanHang(e.target.value)} required />
        <Label>Nhà Cung Cấp</Label>
        <Input type='text' value={nhaCungCap} onChange={(e) => setNhaCungCap(e.target.value)} required />
        <Label>Địa Chỉ Xuất Hàng</Label>
        <Input type='text' value={diaChiXuatHang} onChange={(e) => setDiaChiXuatHang(e.target.value)} required />
        <Label>Ghi Chú</Label>
        <Input type='text' value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} />
        <Fieldset>
          <Label>Tên Người Nhập</Label>
          <Input type='text' value={tenNguoiNhap} onChange={(e) => setTenNguoiNhap(e.target.value)} />
        </Fieldset>

        <Label>Trạng Thái</Label>
        <Select value={trangThai} onChange={(e) => setTrangThai(Number(e.target.value))}>
          <option value={1}>Nháp</option>
          <option value={2}>Công Khai</option>
          <option value={3}>Không Được Duyệt</option>
        </Select>
        <Button type='submit'>{fuelInput ? 'Cập Nhật' : 'Gửi'}</Button>
      </Form>
    </Container>
  )
}

export default AddFuelInput
