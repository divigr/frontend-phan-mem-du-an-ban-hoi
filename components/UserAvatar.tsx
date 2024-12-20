/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { changeAvatar, getAvatar, removeAvatar } from '../services/avatarService'
import { User } from '../utils/authHelpers'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserAvatar: React.FC<{ userData: User }> = ({ userData }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const defaultAvatar = '/LogoVuong.png'
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  // Fetch avatar when component mounts
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatar = await getAvatar(userData.id || '')
        setAvatarUrl(avatar)
      } catch (error) {
        console.error('Failed to fetch avatar:', error)
      }
    }

    fetchAvatar()
  }, [userData.id])

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file) // Set the selected file to state
  }

  // Handle avatar upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Vui lòng chọn một file để upload')
      return
    }
    try {
      // Create FormData object to send file to API
      const formData = new FormData()
      formData.append('avatar', selectedFile)

      const result = await changeAvatar(userData.id || '', formData) // Assuming changeAvatar handles FormData
      setAvatarUrl(result.avatar) // Update avatar after successful upload
      setDropdownVisible(false) // Hide dropdown
      alert('Avatar changed successfully')
    } catch (error) {
      console.error('Error uploading avatar:', error)
    }
  }

  // Handle avatar removal
  const handleRemove = async () => {
    try {
      await removeAvatar(userData.id || '')
      setAvatarUrl(defaultAvatar) // Set to default avatar after removal
      setDropdownVisible(false) // Hide dropdown
      alert('Avatar removed successfully')
    } catch (error) {
      console.error('Error removing avatar:', error)
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className='relative inline-block text-left'>
      <div className='flex items-center space-x-4'>
        <FontAwesomeIcon icon={faBell} className='text-white-600 cursor-pointer' size='lg' onClick={() => alert('Notifications clicked!')} />
        <img
          src={avatarUrl || defaultAvatar}
          alt='User Avatar'
          className='cursor-pointer rounded-full border-2 border-gray-300 w-12 h-12'
          onClick={() => setDropdownVisible(!dropdownVisible)}
        />
        <p ml-5> {userData.username}</p>
      </div>

      {dropdownVisible && (
        <div className='absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <ul className='py-1 text-sm text-gray-700' aria-labelledby='avatar-menu'>
            <li className='hover:bg-gray-100'>
              <input type='file' onChange={handleFileChange} className='hidden' id='avatarUpload' />
              <label htmlFor='avatarUpload' className='block px-4 py-2 cursor-pointer'>
                Đổi avatar
              </label>
            </li>
            <li className='block px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleRemove}>
              Xóa avatar
            </li>
            <li className='block px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={handleLogout}>
              Đăng xuất
            </li>
          </ul>
        </div>
      )}

      {selectedFile && (
        <div className='mt-2'>
          <button onClick={handleUpload} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Upload Avatar
          </button>
        </div>
      )}
    </div>
  )
}

export default UserAvatar
