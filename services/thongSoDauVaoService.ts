import axios from 'axios'
import { ThongSoVanHanh, ThongSoVanHanhIndexProps } from '../models/ThongSoVanHanh' // Assuming you create a model similar to backend structure
import { thongSoVanHanhAPI } from './api/api' // Base URL for the API

// Fetch all ThongSoVanHanh records
export const getAllThongSoVanHanh = async (): Promise<ThongSoVanHanh[]> => {
  try {
    const response = await axios.get(`${thongSoVanHanhAPI}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.thongSoVanHanhs
  } catch (error) {
    console.error('Error fetching all operational parameters:', error)
    throw error
  }
}

// Create a new ThongSoVanHanh record
export const createThongSoVanHanh = async (data: ThongSoVanHanh): Promise<ThongSoVanHanh> => {
  try {
    const response = await axios.post(`${thongSoVanHanhAPI}/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.thongSoVanHanh
  } catch (error) {
    console.error('Error creating operational parameter:', error)
    throw error
  }
}

// Update ThongSoVanHanh by ID
export const updateThongSoVanHanh = async (id: string, data: ThongSoVanHanh): Promise<ThongSoVanHanh> => {
  try {
    const response = await axios.put(`${thongSoVanHanhAPI}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.thongSoVanHanh
  } catch (error) {
    console.error('Error updating operational parameter:', error)
    throw error
  }
}

// Delete ThongSoVanHanh by ID
export const deleteThongSoVanHanh = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${thongSoVanHanhAPI}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error deleting operational parameter:', error)
    throw error
  }
}

// Filter ThongSoVanHanh based on query parameters
export const filterThongSoVanHanh = async (params: Partial<ThongSoVanHanh>): Promise<ThongSoVanHanh[]> => {
  try {
    const response = await axios.get(`${thongSoVanHanhAPI}/filter`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })
    return response.data.thongSoVanHanhs
  } catch (error) {
    console.error('Error filtering operational parameters:', error)
    throw error
  }
}

export const getThongSoVanHanhTheoLo = async (id: string): Promise<ThongSoVanHanh> => {
  try {
    const response = await axios.get(`${thongSoVanHanhAPI}/thong-so-van-hanh-theo-lo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data.data // Assuming the API returns a single fuel input in a field called 'fuelInput'
  } catch (error) {
    console.error('Error fetching fuel input by ID:', error)
    throw error
  }
}

export const getThongSoTheoThang = async (projectId: string, month?: string): Promise<ThongSoVanHanhIndexProps[]> => {
  try {
    const currentMonth = month || new Date().toISOString().slice(0, 7)

    const response = await axios.get(`${thongSoVanHanhAPI}/thong-so-theo-thang`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { projectId, month: currentMonth },
    })

    return response.data.tongHopTheoNgay
  } catch (error) {
    console.error('Error fetching operational parameters by month:', error)
    throw error
  }
}

export const getThongSoTheoNgay = async (projectId: string, date: string): Promise<ThongSoVanHanh[]> => {
  try {
    const response = await axios.get(`${thongSoVanHanhAPI}/thong-so-theo-ngay`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { projectId, date },
    })

    // Ensure the data structure matches the return type
    return response.data.results
  } catch (error) {
    console.error('Error fetching operational parameters for the day:', error)
    throw error
  }
}

export const uploadThongSoVanHanh = async (projectId: string, file: File): Promise<ThongSoVanHanh> => {
  try {
    const formData = new FormData()
    formData.append('projectId', projectId) // Add the projectId to the form
    formData.append('file', file) // Attach the file to the form

    const response = await axios.post(`${thongSoVanHanhAPI}/upload-thong-so-van-hanh`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data // Return the response from the server
  } catch (error) {
    console.error('Error uploading operational parameters:', error)
    throw error
  }
}
