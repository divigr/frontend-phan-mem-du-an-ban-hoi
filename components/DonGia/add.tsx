import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createDonGia, updateDonGia, getDonGiaById } from '../../services/donGiaService'
import styled from 'styled-components'
import { DonGia } from '../../models/donGia'

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
`

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`

const Button = styled.button`
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const AddDonGiaForm: React.FC<{ donGia?: DonGia }> = ({ donGia }) => {
  const router = useRouter()
  const [formData, setFormData] = useState<Partial<DonGia>>({ ...donGia, ngayGio: donGia?.ngayGio || '' })
  const [isDateSelected, setIsDateSelected] = useState<boolean>(!!donGia?.ngayGio)

  useEffect(() => {
    const fetchDonGia = async () => {
      if (router.query.id) {
        const fetchedDonGia = await getDonGiaById(router.query.id as string)

        // Ensure `ngayGio` is defined before using it
        setFormData(fetchedDonGia)
        setIsDateSelected(!!fetchedDonGia?.ngayGio)
      }
    }
    fetchDonGia()
  }, [router.query.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData._id) {
      await updateDonGia(formData._id, formData as DonGia)
    } else {
      await createDonGia(formData as DonGia)
    }
    router.push(`/thong-tin-lo/quan-ly-lo/don-gia?idLo=${router.query.idLo}`)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ngayGio: e.target.value })
    setIsDateSelected(!!e.target.value)
  }

  return (
    <Container>
      <Title>{formData._id ? 'Edit Đơn Giá' : 'Add Đơn Giá'}</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Ngày/Giờ</Label>
        <Input type='datetime-local' value={formData.ngayGio || ''} onChange={handleDateChange} required />

        <Label>Doanh Thu Cố Định</Label>
        <Input
          type='number'
          value={formData.doanhThuCoDinh || ''}
          onChange={(e) => setFormData({ ...formData, doanhThuCoDinh: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Bán Hơi</Label>
        <Input
          type='number'
          value={formData.donGiaBanHoi || ''}
          onChange={(e) => setFormData({ ...formData, donGiaBanHoi: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Nhiên Liệu</Label>
        <Input
          type='number'
          value={formData.donGiaNhienLieu || ''}
          onChange={(e) => setFormData({ ...formData, donGiaNhienLieu: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Điện</Label>
        <Input
          type='number'
          value={formData.donGiaDien || ''}
          onChange={(e) => setFormData({ ...formData, donGiaDien: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Muối</Label>
        <Input
          type='number'
          value={formData.donGiaMuoi || ''}
          onChange={(e) => setFormData({ ...formData, donGiaMuoi: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Hóa Chất</Label>
        <Input
          type='number'
          value={formData.donGiaHoaChat || ''}
          onChange={(e) => setFormData({ ...formData, donGiaHoaChat: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Dầu FO</Label>
        <Input
          type='number'
          value={formData.donGiaDauFo || ''}
          onChange={(e) => setFormData({ ...formData, donGiaDauFo: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Đơn Giá Dầu DO</Label>
        <Input
          type='number'
          value={formData.donGiaDauDo || ''}
          onChange={(e) => setFormData({ ...formData, donGiaDauDo: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Trạng Thái</Label>
        <Select
          value={formData.trangThai || 1}
          onChange={(e) => setFormData({ ...formData, trangThai: Number(e.target.value) })}
          disabled={!isDateSelected}>
          <option value={1}>Nháp</option>
          <option value={2}>Đã Public</option>
          <option value={3}>Không Được Duyệt</option>
        </Select>

        <Button type='submit' disabled={!isDateSelected}>
          {formData._id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </Container>
  )
}

export default AddDonGiaForm
