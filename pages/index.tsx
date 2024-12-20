import { useEffect, useState } from 'react'
import { getAllProjects } from '../services/projectServices'
import DashboardInfo from '../components/InfoUser'

const HomePage = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])
  return <DashboardInfo projects={projects} loading={loading} />
}

export default HomePage
