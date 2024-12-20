import apiClient from '../config/axiosConfig'
import { setCookie } from 'nookies'

export const loginService = async (username: string, password: string) => {
  const response = await apiClient.post('/auth/login', { username, password })

  if (response.status === 200) {
    const { token } = response.data
    if (token) {
      setCookie(null, 'token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      })

      localStorage.setItem('token', token)
      localStorage.setItem('userData', JSON.stringify(response.data))
      if (response.data.user.avatar) {
        localStorage.setItem('avatar', response.data.user.avatar)
      }
    }
    return response.data
  } else {
    throw new Error('Login failed')
  }
}

export const registerService = async (userData: { username: string; password: string; email: string }) => {
  try {
    const response = await apiClient.post('/auth/register', userData)

    // Giả sử API trả về token trong response.data giống như login
    const { token } = response.data
    if (token) {
      // Lưu token và response.data vào localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('userData', JSON.stringify(response.data))
    }

    return response.data
  } catch {
    throw new Error('Error registering user')
  }
}

export const validateTokenService = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      throw new Error('Token not found')
    }

    const response = await apiClient.get('/auth/validate-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      console.log('Token is valid:', response.data)
      return true
    }
  } catch (error) {
    console.error('Token validation failed:', error)
    return false
  }
}
