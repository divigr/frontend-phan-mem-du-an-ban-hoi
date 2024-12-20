import apiClient from '../config/axiosConfig'
import { getToken } from '../utils/authHelpers'
import { users } from './api/api'

// Hàm để lấy avatar của người dùng
export const getAvatar = async (userId: string) => {
  try {
    const token = getToken()
    if (!token) {
      throw new Error('No token found')
    }

    const response = await apiClient.get(`${users}/avatar/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })

    const avatarUrl = URL.createObjectURL(response.data)
    return avatarUrl
  } catch (error) {
    console.error('Failed to fetch avatar', error)
    throw new Error('Failed to fetch avatar')
  }
}

// Hàm để thay đổi avatar
export const changeAvatar = async (userId: string, avatarFile: File) => {
  try {
    const token = getToken()

    if (!token) {
      throw new Error('No token found')
    }

    // Using FormData to send the file
    const formData = new FormData()
    formData.append('avatar', avatarFile)

    const response = await apiClient.put(`${users}/upload-avatar/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.status !== 200) {
      throw new Error(`Failed to upload avatar. Status: ${response.status}`)
    }

    return response.data // Return the avatar URL or other response data
  } catch (error) {
    if (error.response) {
      console.error('API error response:', error.response)
      throw new Error(`API error: ${error.response.data.message || 'Failed to change avatar'}`)
    } else {
      console.error('Error:', error.message)
      throw new Error(error.message || 'Failed to change avatar')
    }
  }
}

// Hàm để xóa avatar
export const removeAvatar = async (userId: string) => {
  try {
    const token = getToken()
    if (!token) {
      throw new Error('No token found')
    }

    const response = await apiClient.delete(`${users}/remove-avatar/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data // Trả về dữ liệu sau khi xóa (nếu cần)
  } catch {
    throw new Error('Failed to remove avatar')
  }
}
