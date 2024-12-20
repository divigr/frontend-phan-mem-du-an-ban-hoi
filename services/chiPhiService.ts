import axios from 'axios'
import { chiPhiAPI } from './api/api' // Base URL for the API
import { ChiPhi } from '../models/chiPhi'

// Fetch all ChiPhi records
export const getAllChiPhi = async (): Promise<ChiPhi[]> => {
  try {
    const response = await axios.get(`${chiPhiAPI}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.chiPhis
  } catch (error) {
    console.error('Error fetching all costs:', error)
    throw error
  }
}

// Fetch ChiPhi by ID
export const getChiPhiById = async (id: string): Promise<ChiPhi> => {
  try {
    const response = await axios.get(`${chiPhiAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.chiPhi
  } catch (error) {
    console.error('Error fetching cost by ID:', error)
    throw error
  }
}

// Create a new ChiPhi record
export const createChiPhi = async (data: ChiPhi): Promise<ChiPhi> => {
  try {
    const response = await axios.post(`${chiPhiAPI}/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.chiPhi
  } catch (error) {
    console.error('Error creating cost:', error)
    throw error
  }
}

// Update ChiPhi by ID
export const updateChiPhi = async (id: string, data: ChiPhi): Promise<ChiPhi> => {
  try {
    const response = await axios.put(`${chiPhiAPI}/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.chiPhi
  } catch (error) {
    console.error('Error updating cost:', error)
    throw error
  }
}

// Delete ChiPhi by ID
export const deleteChiPhi = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${chiPhiAPI}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error deleting cost:', error)
    throw error
  }
}

// Fetch ChiPhi by loId
export const getChiPhiByLoId = async (loId: string): Promise<ChiPhi> => {
  try {
    const response = await axios.get(`${chiPhiAPI}/chi-phi-theo-lo/${loId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching cost by loId:', error)
    throw error
  }
}
