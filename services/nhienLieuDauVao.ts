import axios from 'axios'
import { FuelData, FuelInput, FuelState } from '../models/FuelInput'
import { nhienLieuDauVaoAPI } from './api/api'

// Fetch all FuelInputs
export const getAllFuelInputs = async (): Promise<FuelInput[]> => {
  try {
    const response = await axios.get(`${nhienLieuDauVaoAPI}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.fuelInputs
  } catch (error) {
    console.error('Error fetching all fuel inputs:', error)
    throw error
  }
}

// Fetch a FuelInput by ID
export const getFuelInputById = async (id: string): Promise<FuelInput> => {
  try {
    const response = await axios.get(`${nhienLieuDauVaoAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data.nhienLieuDauVao // Assuming the API returns a single fuel input in a field called 'fuelInput'
  } catch (error) {
    console.error('Error fetching fuel input by ID:', error)
    throw error
  }
}

// Create a new FuelInput
export const createFuelInput = async (data: FuelInput): Promise<FuelInput> => {
  try {
    const response = await axios.post(`${nhienLieuDauVaoAPI}/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.nhienLieuDauVao // Assuming the API returns the created fuel input in a field called 'fuelInput'
  } catch (error) {
    console.error('Error creating fuel input:', error)
    throw error
  }
}

// Update a FuelInput by ID
export const updateFuelInput = async (id: string, data: FuelInput): Promise<FuelInput> => {
  try {
    const response = await axios.put(`${nhienLieuDauVaoAPI}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.fuelInput // Assuming the API returns the updated fuel input in a field called 'fuelInput'
  } catch (error) {
    console.error('Error updating fuel input:', error)
    throw error
  }
}

// Delete a FuelInput by ID
export const deleteFuelInput = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${nhienLieuDauVaoAPI}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.message // Assuming the API returns a message field confirming deletion
  } catch (error) {
    console.error('Error deleting fuel input:', error)
    throw error
  }
}

export const getIdLo = async (id: string): Promise<FuelInput> => {
  try {
    const response = await axios.get(`${nhienLieuDauVaoAPI}/nhien-lieu-theo-lo/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data // Return the entire data from the response
  } catch (error) {
    console.error('Error fetching fuel input by ID:', error)
    throw error
  }
}

// Filter FuelInputs based on query parameters
export const filterFuelInput = async (params: FuelInput): Promise<FuelInput | undefined> => {
  try {
    const response = await axios.get(`${nhienLieuDauVaoAPI}/filter-nhien-lieu`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })
    return response.data.nhienLieuDauVaos
  } catch (error: unknown) {
    console.error('Error filtering fuel input:', error)
    return undefined
  }
}

export const getFuelInputByMonth = async (projectId: string, month: string): Promise<FuelData[]> => {
  try {
    const response = await axios.get(`${nhienLieuDauVaoAPI}/thong-so-theo-thang`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { projectId, month },
    })

    return response.data.data as FuelData[] // Cast the response to FuelData[]
  } catch (error) {
    console.error('Error fetching fuel input by month:', error)
    throw error
  }
}

// Fetch fuel inputs summary by day
export const getFuelInputByDay = async (projectId: string, date: string): Promise<FuelState> => {
  try {
    const response = await axios.get<FuelState>(`${nhienLieuDauVaoAPI}/thong-so-theo-ngay`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { projectId, date },
    })

    return response.data // Return the API response data
  } catch (error) {
    console.error('Error fetching fuel inputs:', error)
    throw error
  }
}

export const uploadNhienLieuDauVao = async (projectId: string, file: File): Promise<FuelInput | undefined> => {
  try {
    // Create a FormData object to hold the file and projectId
    const formData = new FormData()
    formData.append('projectId', projectId) // Add projectId
    formData.append('file', file) // Add file

    // Make the POST request
    const response = await axios.post(`${nhienLieuDauVaoAPI}/upload-du-lieu-nhien-lieu-dau-vao`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization token
        'Content-Type': 'multipart/form-data', // Required for file uploads
      },
    })

    return response.data // Return the response data
  } catch (error) {
    console.error('Error uploading file for fuel input:', error)
    throw error
  }
}
