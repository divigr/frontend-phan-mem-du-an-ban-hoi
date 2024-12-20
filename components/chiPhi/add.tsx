// components/chiPhi/AddChiPhiForm.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createChiPhi, updateChiPhi, getChiPhiById } from '../../services/chiPhiService'
import styled from 'styled-components'
import { ChiPhi } from '../../models/chiPhi'

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

const AddChiPhiForm: React.FC = () => {
  const router = useRouter()
  const { idLo } = router.query

  const [formData, setFormData] = useState<Partial<ChiPhi>>({ ngayGio: '', trangThai: 1 }) // Default trangThai to 1
  const [isDateSelected, setIsDateSelected] = useState(false)

  useEffect(() => {
    if (idLo) {
      setFormData((prev) => ({ ...prev, loId: idLo as string }))
    }

    const fetchChiPhi = async () => {
      if (router.query.id) {
        const data = await getChiPhiById(router.query.id as string)
        setFormData(data)
        setIsDateSelected(!!data.ngayGio)
      }
    }
    fetchChiPhi()
  }, [idLo, router.query.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.loId) {
      alert('loId is required')
      return
    }

    if (formData._id) {
      await updateChiPhi(formData._id, formData as ChiPhi)
    } else {
      await createChiPhi(formData as ChiPhi)
    }
    router.push(`/thong-tin-lo/quan-ly-lo/chi-phi?idLo=${router.query.idLo}`)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ngayGio: e.target.value })
    setIsDateSelected(!!e.target.value)
  }

  const handleTrangThaiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, trangThai: Number(e.target.value) })
  }

  return (
    <Container>
      <Title>{formData._id ? 'Edit Chi Phí' : 'Add Chi Phí'}</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Ngày/Giờ</Label>
        <Input type='datetime-local' value={formData.ngayGio || ''} onChange={handleDateChange} required />

        <Label>Chi Phí Lương Nhân Công</Label>
        <Input
          type='number'
          value={formData.chiPhiLuongNhanCong || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiLuongNhanCong: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Khấu Hao</Label>
        <Input
          type='number'
          value={formData.chiPhiKhauHao || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiKhauHao: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Phân Bổ</Label>
        <Input
          type='number'
          value={formData.chiPhiPhanBo || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiPhanBo: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Lãi Vay</Label>
        <Input
          type='number'
          value={formData.chiPhiLaiVay || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiLaiVay: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Sửa Chữa Bảo Trì</Label>
        <Input
          type='number'
          value={formData.chiPhiSuaChuaBaoTri || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiSuaChuaBaoTri: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Công Tác</Label>
        <Input
          type='number'
          value={formData.chiPhiCongTac || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiCongTac: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí Khác</Label>
        <Input
          type='number'
          value={formData.chiPhiKhac || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiKhac: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Chi Phí BHXH</Label>
        <Input
          type='number'
          value={formData.chiPhiBHXH || ''}
          onChange={(e) => setFormData({ ...formData, chiPhiBHXH: Number(e.target.value) })}
          disabled={!isDateSelected}
        />

        <Label>Trạng Thái</Label>
        <Select value={formData.trangThai} onChange={handleTrangThaiChange} disabled={!isDateSelected}>
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

export default AddChiPhiForm
