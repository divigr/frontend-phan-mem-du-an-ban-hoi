// src/services/userService.ts
import apiClient from '../config/axiosConfig'
import { getToken } from '../utils/authHelpers'
import { users } from './api/api'

export const getAllUsers = async (filters?: { cap?: string; status?: string }) => {
  try {
    const token = getToken() // Get token from localStorage or cookies

    if (!token) {
      throw new Error('No token found')
    }

    // Prepare query parameters based on filters
    let queryParams = ''
    if (filters) {
      const queryArray = []
      if (filters.cap) {
        queryArray.push(`cap=${filters.cap}`)
      }
      if (filters.status) {
        queryArray.push(`status=${filters.status}`)
      }
      queryParams = queryArray.length > 0 ? `?${queryArray.join('&')}` : ''
    }

    const response = await apiClient.get(`${users}/all${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch {
    throw new Error('Failed to fetch users')
  }
}

// Service for creating a new user
export const createUserService = async (userData: {
  name: string
  username: string
  password: string
  email: string
  sdt: string
  status: string
  khu_vuc_quan_ly: string
}) => {
  try {
    const response = await apiClient.post(`${users}/create`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data
  } catch {
    throw new Error('Error creating user')
  }
}

// Service for updating an existing user
export const updateUserService = async (
  id: string,
  userData: {
    name: string
    username: string
    password?: string // Optional, in case password is not updated
    email: string
    sdt: string
    status: string
    khu_vuc_quan_ly: string
  }
) => {
  try {
    const response = await apiClient.put(`${users}/update/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data
  } catch {
    throw new Error('Error updating user')
  }
}

// Service for deleting a user
export const deleteUserService = async (id: string) => {
  try {
    const response = await apiClient.delete(`${users}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data
  } catch {
    throw new Error('Error deleting user')
  }
}

export const getUserByIdService = async (id: string) => {
  try {
    const response = await apiClient.get(`${users}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored
      },
    })
    return response.data
  } catch {
    throw new Error('Error fetching user by ID')
  }
}
