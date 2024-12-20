import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'tailwindcss/tailwind.css'
import { createUserService, getUserByIdService, updateUserService } from '../../services/userService'

const AddUser = () => {
  const router = useRouter()
  const { id } = router.query // Get 'id' from query parameters

  const [userData, setUserData] = useState({
    id: uuidv4(), // Default for new user creation
    name: '',
    username: '',
    password: '', // Leave password blank initially
    email: '',
    sdt: '',
    status: '1', // Default to 'Admin'
    khu_vuc_quan_ly: '',
  })

  const [passwordChanged, setPasswordChanged] = useState(false) // Track if the password was changed
  const [showPassword, setShowPassword] = useState(false) // State to control password visibility
  const [loading, setLoading] = useState(false) // State for loading feedback
  const [error, setError] = useState<string | null>(null) // State for error handling

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChanged(true) // Track that the password was modified
    setUserData({
      ...userData,
      password: e.target.value,
    })
  }

  // Submit handler for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const updatedUserData = { ...userData }

    // If password wasn't changed, remove it from the request payload
    if (!passwordChanged) {
      delete updatedUserData.password
    }

    try {
      if (id) {
        // Update existing user
        await updateUserService(id as string, updatedUserData) // Pass user ID and updated data
      } else {
        // Create new user
        await createUserService(userData)
      }
      router.push('/users') // Redirect after success
    } catch (err) {
      setError('An error occurred while processing your request.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // useEffect to fetch the user data if in edit mode (id is present)
  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        setLoading(true)
        try {
          const response = await getUserByIdService(id as string) // Fetch the user by ID
          const existingUser = response.user // Assuming the response contains { user: {...} }
          if (existingUser) {
            setUserData({
              id: existingUser.id,
              name: existingUser.name,
              username: existingUser.username,
              password: '', // Set password to blank (you never display the hashed password)
              email: existingUser.email,
              sdt: existingUser.sdt,
              status: existingUser.status.toString(), // Convert status to string for the <select> field
              khu_vuc_quan_ly: existingUser.khu_vuc_quan_ly,
            })
          }
        } catch (error) {
          setError('Error fetching user data')
          console.error('Error fetching user data:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUser()
  }, [id]) // Dependency array: re-run when 'id' changes

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-md'>
      <h1 className='text-xl font-bold mb-6'>{id ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}</h1>
      {error && <p className='text-red-600'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Name</label>
          <input type='text' name='name' value={userData.name} onChange={handleInputChange} className='w-full px-4 py-2 border rounded-md' required />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Username</label>
          <input
            type='text'
            name='username'
            value={userData.username}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Password</label>
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={userData.password}
              onChange={handlePasswordChange} // Use handlePasswordChange to track password updates
              className='w-full px-4 py-2 border rounded-md'
              placeholder={id ? '********' : 'Enter password'} // Show placeholder if editing
              required={!id} // Require password if creating a new user
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 px-3 py-2 text-sm text-gray-700 bg-gray-200 border border-gray-300 rounded-md'>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            value={userData.email}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Phone</label>
          <input type='text' name='sdt' value={userData.sdt} onChange={handleInputChange} className='w-full px-4 py-2 border rounded-md' required />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Status</label>
          <select name='status' value={userData.status} onChange={handleInputChange} className='w-full px-4 py-2 border rounded-md' required>
            <option value='1'>Admin</option>
            <option value='2'>Quản lý</option>
            <option value='3'>Kế toán</option>
            <option value='4'>Nhập liệu</option>
          </select>
        </div>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Khu Vực Quản Lý</label>
          <input
            type='text'
            name='khu_vuc_quan_ly'
            value={userData.khu_vuc_quan_ly}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
          />
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700' disabled={loading}>
          {loading ? 'Processing...' : id ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default AddUser
