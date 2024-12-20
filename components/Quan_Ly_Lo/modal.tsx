import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { ThongSoVanHanh } from '../../models/ThongSoVanHanh'

interface ModalProps {
  shift: ThongSoVanHanh
  onClose: () => void
}

const ModalQuanLyLo = ({ shift, onClose }: ModalProps) => {
  if (!shift) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Thông Tin Ca Lò Hơi</Title>
        <ModalBody>
          <InfoRow>
            <Label>Ca:</Label> {shift.ca}
          </InfoRow>
          <InfoRow>
            <Label>Date/Time:</Label> {shift.dateTime}
          </InfoRow>
          <InfoRow>
            <Label>Số Lượng Hơi:</Label> {shift.soLuongHoi}
          </InfoRow>
          <InfoRow>
            <Label>Số Lượng Điện:</Label> {shift.soLuongDien}
          </InfoRow>
          <InfoRow>
            <Label>Hóa Chất:</Label> {shift.hoaChat}
          </InfoRow>
          <InfoRow>
            <Label>Muối:</Label> {shift.muoi}
          </InfoRow>
          <InfoRow>
            <Label>DO (Dissolved Oxygen):</Label> {shift.dau_do}
          </InfoRow>
          <InfoRow>
            <Label>Nhiên Liệu:</Label> {shift.nhienLieu}
          </InfoRow>
        </ModalBody>
        <ModalActions>
          <Link href={`/thong-tin-lo/quan-ly-lo/add?id=${shift.id}`}>
            <EditButton>Edit</EditButton>
          </Link>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalQuanLyLo

// Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* Dark background for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px; /* Ensure padding for small screen devices */
`

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 500px;
  max-width: 100%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Soft shadow for depth */
  text-align: left;
  animation: fadeIn 0.3s ease; /* Optional fade-in animation */

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  border-bottom: 2px solid #f2f2f2;
  padding-bottom: 10px;
  text-align: center;
`

const ModalBody = styled.div`
  margin-top: 20px;
`

const InfoRow = styled.p`
  margin-bottom: 12px;
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`

const Label = styled.span`
  font-weight: bold;
  color: #333;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 45%;

  &:hover {
    background-color: #c0392b;
  }
`
