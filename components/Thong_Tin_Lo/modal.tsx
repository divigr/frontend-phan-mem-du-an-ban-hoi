import Link from 'next/link'
import styled from 'styled-components'
import { Project } from '../../models/ProjectData'

interface BoilerInfoModalProps {
  project: Project | null
  onClose: () => void
}

const BoilerInfoModal: React.FC<BoilerInfoModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>{project.name}</ModalHeader>
        <ModalDescription>
          <p>Địa Chỉ: {project.diaChi}</p>
          <p>Mô Tả: {project.description}</p>
          <p>Tổng Chi Phí: {project.tongChiPhi} VNĐ</p>
        </ModalDescription>
        <KilnInfoContainer>
          {project.lo.map((kiln) => (
            <KilnInfo key={kiln._id}>
              <h3>{kiln.tenLo}</h3>
              <p>Công Suất: {kiln.congSuat}</p>
              <p>Chi Phí: {kiln.chiPhi}</p>
              <StatusLabel isActive={kiln.isActive}>Trạng Thái: {kiln.isActive ? 'Hoạt động' : 'Ngừng hoạt động'}</StatusLabel>
            </KilnInfo>
          ))}
        </KilnInfoContainer>
        <ModalFooter>
          <Link href={`/thong-tin-lo/add?id=${project._id}`}>
            <EditButton>Edit</EditButton>
          </Link>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  )
}

export default BoilerInfoModal

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
`

const ModalHeader = styled.div`
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`

const ModalDescription = styled.div`
  padding: 20px;
  font-size: 1rem;
`

const KilnInfoContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const KilnInfo = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const StatusLabel = styled.label<{ isActive: boolean }>`
  display: inline-block;
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: ${({ isActive }) => (isActive ? '#28a745' : '#dc3545')};
  font-size: 0.9rem;
  text-align: center;
`

const ModalFooter = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-around;
  background-color: #f1f1f1;
`

const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
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
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`
