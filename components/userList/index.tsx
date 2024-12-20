import React, { useState } from 'react'
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'
import styled from 'styled-components'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { UsersPageProps } from '../../models/userData'
import UserInfoModal from './modal'
import { deleteUser } from '../../redux/slices/userInfo'

const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
  const dispatch = useDispatch()

  // State for managing selected user and modal visibility
  const [selectedUser, setSelectedUser] = useState<{
    id: string
    name: string
    username: string
    email: string
    status: number
    khu_vuc_quan_ly: string
  } | null>(null)

  console.log('users', users)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // Function to handle viewing user details
  const handleViewUser = (user: { id: string; name: string; username: string; email: string; status: number; khu_vuc_quan_ly: string }) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  // Function to handle deleting a user
  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id)) // Dispatch action to delete user
    console.log('Deleting user with id:', id)
  }

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUser(null)
  }

  const getUserRole = (status: number) => {
    switch (status) {
      case 1:
        return 'Admin'
      case 2:
        return 'Quản lý'
      case 3:
        return 'Kế toán'
      case 4:
        return 'Nhập liệu'
      default:
        return 'Inactive'
    }
  }

  return (
    <Wrapper>
      <Header>
        <h1>Quản Lý Người Dùng</h1>
        <Link href='/users/add'>
          <AddButton>+ Thêm Người Dùng</AddButton>
        </Link>
      </Header>
      <Table>
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Cấp Bậc</th>
            <th>Khu Vực Quản Lý</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{getUserRole(user.status)}</td>
                <td>{user.khu_vuc_quan_ly}</td>
                <td>
                  <ActionButton onClick={() => handleViewUser(user)}>
                    <FaEye />
                  </ActionButton>
                  <Link href={`/users/add?id=${user._id}`}>
                    <ActionButton>
                      <FaEdit />
                    </ActionButton>
                  </Link>
                  <ActionButton onClick={() => handleDeleteUser(user._id)}>
                    <FaTrashAlt />
                  </ActionButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* User detail modal */}
      {isModalOpen && selectedUser && <UserInfoModal user={selectedUser} onClose={handleCloseModal} />}
    </Wrapper>
  )
}

export default UsersPage

// Styled components
const Wrapper = styled.div`
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const AddButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }
`

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  color: #333;
  font-size: 16px;
`
