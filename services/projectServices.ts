import axios from 'axios'
import { project } from './api/api'

// Fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${project}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })

    return response.data.projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

// Fetch a project by ID
export const getProjectById = async (projectId: string) => {
  try {
    const response = await axios.get(`${project}/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.project
  } catch (error) {
    console.error('Error fetching project by ID:', error)
    throw error
  }
}

// Create a new project
export const createProject = async (projectData: { name: string; description: string; duAn: string; diaChi: string; congSuat: string }) => {
  try {
    const response = await axios.post(`${project}/create`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.project
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

// Update a project
export const updateProject = async (
  projectId: string,
  projectData: {
    name: string
    description: string
    duAn: string
    diaChi: string
    congSuat: string
  }
) => {
  try {
    const response = await axios.put(`${project}/update/${projectId}`, projectData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.project
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

// Delete a project
export const deleteProject = async (projectId: string) => {
  try {
    const response = await axios.delete(`${project}/delete/${projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token in headers
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

export const filterProjects = async (filterParams: {
  khuVuc?: number
  isActive?: boolean
  minChiPhi?: number
  maxChiPhi?: number
  tenLo?: string
}) => {
  try {
    const response = await axios.get(`${project}/filter-du-an`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: filterParams,
    })

    return response.data
  } catch (error) {
    console.error('Error filtering projects:', error)
    throw error
  }
}
