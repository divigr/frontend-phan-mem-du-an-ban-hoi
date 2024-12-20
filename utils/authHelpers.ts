// src/utils/authHelpers.ts

// Khai báo cấu trúc cho đối tượng user
export interface User {
  id: string
  username: string
  email: string
  status: number
}

// Khai báo cấu trúc cho userData
export interface UserData {
  token: string
  user: User
}

// Hàm lấy dữ liệu user từ localStorage
export const getUserData = (): UserData | null => {
  const userData = localStorage.getItem('userData')
  if (!userData) return null

  try {
    const parsedData = JSON.parse(userData)
    if (parsedData) {
      return parsedData
    } else {
      return null // Trả về null nếu dữ liệu không hợp lệ
    }
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error)
    return null
  }
}

// Hàm lấy token từ localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

// Hàm xóa dữ liệu xác thực khỏi localStorage
export const clearAuthData = (): void => {
  localStorage.removeItem('token')
  localStorage.removeItem('userData')
}
