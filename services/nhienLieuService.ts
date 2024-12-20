import axios from 'axios'
import { nhienLieuAPI } from './api/api' // Base URL for the API
import { NhienLieu } from '../models/NhienLieu'

// Fetch all NhienLieu records
export const getAllNhienLieu = async (): Promise<NhienLieu[]> => {
  try {
    const response = await axios.get(`${nhienLieuAPI}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.nhienLieuList
  } catch (error) {
    console.error('Error fetching all NhienLieu:', error)
    throw error
  }
}

// Fetch NhienLieu by ID
export const getNhienLieuById = async (id: string): Promise<NhienLieu> => {
  try {
    const response = await axios.get(`${nhienLieuAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.nhienLieu
  } catch (error) {
    console.error('Error fetching NhienLieu by ID:', error)
    throw error
  }
}

// Create NhienLieu
export const createNhienLieu = async (data: Partial<NhienLieu>): Promise<NhienLieu> => {
  try {
    const response = await axios.post(`${nhienLieuAPI}/create-nhien-lieu`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.nhienLieu
  } catch (error) {
    console.error('Error creating NhienLieu:', error)
    throw error
  }
}

// Update NhienLieu by ID
export const updateNhienLieu = async (id: string, data: Partial<NhienLieu>): Promise<NhienLieu> => {
  try {
    const response = await axios.put(`${nhienLieuAPI}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data.nhienLieu
  } catch (error) {
    console.error('Error updating NhienLieu:', error)
    throw error
  }
}
// Delete NhienLieu by ID
export const deleteNhienLieu = async (id: string): Promise<string> => {
  try {
    const response = await axios.delete(`${nhienLieuAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error deleting NhienLieu:', error)
    throw error
  }
}
