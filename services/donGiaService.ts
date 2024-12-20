import axios from 'axios'
import { donGiaAPI } from './api/api' // Base URL for the API
import { DonGia } from '../models/donGia'

// Fetch all DonGia records
export const getAllDonGia = async (): Promise<DonGia[]> => {
  try {
    const response = await axios.get(`${donGiaAPI}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.donGias
  } catch (error) {
    console.error('Error fetching all unit prices:', error)
    throw error
  }
}

// Fetch DonGia by ID
export const getDonGiaById = async (id: string): Promise<DonGia> => {
  try {
    const response = await axios.get(`${donGiaAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.donGia
  } catch (error) {
    console.error('Error fetching unit price by ID:', error)
    throw error
  }
}

// Create a new DonGia record
export const createDonGia = async (data: DonGia): Promise<DonGia> => {
  try {
    const response = await axios.post(`${donGiaAPI}/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.donGia
  } catch (error) {
    console.error('Error creating unit price:', error)
    throw error
  }
}

// Update DonGia by ID
export const updateDonGia = async (id: string, data: DonGia): Promise<DonGia> => {
  try {
    const response = await axios.put(`${donGiaAPI}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.donGia
  } catch (error) {
    console.error('Error updating unit price:', error)
    throw error
  }
}

// Delete DonGia by ID
export const deleteDonGia = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${donGiaAPI}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error deleting unit price:', error)
    throw error
  }
}

// Fetch DonGia by loId
export const getDonGiaByLoId = async (loId: string): Promise<DonGia> => {
  try {
    const response = await axios.get(`${donGiaAPI}/don-gia-theo-lo/${loId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching unit price by loId:', error)
    throw error
  }
}

export const calculateProjectDataByMonth = async (projectId: string, body: any): Promise<any> => {
  try {
    const response = await axios.post(
      `${donGiaAPI}/don-gia-theo-chi-so/${projectId}`,
      body, // Pass the body payload
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error: any) {
    console.error('Error in calculateProjectDataByMonth API call:', error)
    throw error
  }
}
