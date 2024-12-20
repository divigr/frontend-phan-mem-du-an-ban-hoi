import Link from 'next/link'
import styled from 'styled-components'
import { UsersPageProps } from '../../models/userData'

interface UserInfoModalProps {
  user: UsersPageProps | null
  onClose: () => void
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, onClose }) => {
  if (!user) return null

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>User Information</h2>
        <ModalBody>
          <InfoRow>
            <InfoLabel>Name:</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Email:</InfoLabel>
            <InfoValue>{user.email}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Phone:</InfoLabel>
            <InfoValue>{user.sdt}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Status:</InfoLabel>
            <InfoValue>{user.status}</InfoValue>
          </InfoRow>
        </ModalBody>
        <ModalActions>
          <Link href={`/users/add?id=${user.id}`}>
            <EditButton>Edit</EditButton>
          </Link>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  )
}

export default UserInfoModal

// Styled Components remain unchanged from the previous example
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
`

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
`

const ModalBody = styled.div`
  margin-bottom: 20px;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
`

const InfoLabel = styled.span`
  font-weight: bold;
  color: #555;
  font-size: 16px;
`

const InfoValue = styled.span`
  color: #777;
  font-size: 16px;
  text-align: right;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

  &:hover {
    background-color: #c0392b;
  }
`
