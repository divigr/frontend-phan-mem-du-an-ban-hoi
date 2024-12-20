import { useEffect, useState } from 'react'
import UsersPage from '../../components/userList'
import { getAllUsers } from '../../services/userService'

const User = () => {
  // Tạo state để lưu danh sách người dùng
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Gọi API để lấy danh sách người dùng khi component được mount
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data.users) // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Failed to fetch users', error)
      }
    }

    fetchUsers()
  }, [])

  return <UsersPage users={users} />
}

export default User
