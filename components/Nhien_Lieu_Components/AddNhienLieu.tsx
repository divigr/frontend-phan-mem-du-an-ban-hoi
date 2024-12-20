import React, { useState, useEffect } from 'react'
import { NhienLieu } from '../../models/NhienLieu'
import { updateNhienLieu, getNhienLieuById, createNhienLieu } from '../../services/nhienLieuService'
import styled from 'styled-components'

interface AddNhienLieuProps {
  isOpen: boolean
  onClose: () => void
  nhienLieuId?: string
  onSuccess: () => void
}

const AddNhienLieu: React.FC<AddNhienLieuProps> = ({ isOpen, onClose, nhienLieuId, onSuccess }) => {
  const [formData, setFormData] = useState<Partial<NhienLieu>>({ tenNhienLieu: '', thuongHieu: '' })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (nhienLieuId) {
        setIsEditing(true)
        try {
          const data = await getNhienLieuById(nhienLieuId)
          console.log('Fetched Data:', data) // Kiểm tra cấu trúc dữ liệu trả về
          setFormData(data)
        } catch (error) {
          console.error('Error fetching Nhiên Liệu:', error)
        }
      } else {
        setFormData({ tenNhienLieu: '', thuongHieu: '' })
        setIsEditing(false)
      }
    }

    if (isOpen) {
      fetchData()
    }
  }, [isOpen, nhienLieuId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => {
      const updated = { ...prev, [name]: value }
      console.log('Updated FormData:', updated)
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        tenNhienLieu: formData.tenNhienLieu, // Sử dụng đúng tên trường
        thuongHieu: formData.thuongHieu,
      }
      console.log('Payload gửi lên API:', payload)

      if (isEditing && nhienLieuId) {
        await updateNhienLieu(nhienLieuId, payload)
      } else {
        await createNhienLieu(payload)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error saving Nhien Liệu:', error)
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>{isEditing ? 'Chỉnh Sửa Nhiên Liệu' : 'Thêm Nhiên Liệu'}</ModalHeader>
        <StyledForm onSubmit={handleSubmit}>
          <FormField>
            <InputLabel htmlFor='tenNhienLieu'>Tên Nhiên Liệu</InputLabel>
            <InputField type='text' id='tenNhienLieu' name='tenNhienLieu' value={formData.tenNhienLieu || ''} onChange={handleChange} required />
          </FormField>
          <FormField>
            <InputLabel htmlFor='thuongHieu'>Thương Hiệu</InputLabel>
            <InputField type='text' id='thuongHieu' name='thuongHieu' value={formData.thuongHieu || ''} onChange={handleChange} required />{' '}
          </FormField>
          <ButtonContainer>
            <CancelButton type='button' onClick={onClose}>
              Hủy
            </CancelButton>
            <SubmitButton type='submit'>{isEditing ? 'Cập Nhật' : 'Thêm'}</SubmitButton>
          </ButtonContainer>
        </StyledForm>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default AddNhienLieu

// Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Space between label and input */
`

const InputLabel = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
`

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #5a6268;
  }
`

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  &:hover {
    background-color: #0056b3;
  }
`
