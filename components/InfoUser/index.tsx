import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { getUserData, UserData } from '../../utils/authHelpers'
import { Project } from '../../models/ProjectData'
import KhuVuc from '../ProjectCard/khuVuc'

// Styled components for layout
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f7fc;
`

const Content = styled.div`
  flex-grow: 1;
  padding: 40px;
`

const Header = styled.header`
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 28px;
    color: #333;
  }

  button {
    background-color: #e74c3c;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #c0392b;
    }
  }
`

const UserInfo = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  p {
    font-size: 18px;
    color: #555;
  }
`

interface ProjectGridProps {
  projects: Project[]
  loading: boolean
}

const DashboardInfo: React.FC<ProjectGridProps> = ({ projects, loading }) => {
  const router = useRouter()

  const userData: UserData | null = getUserData()

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token')

    router.push('/login')
  }

  return (
    <DashboardContainer>
      {/* Main Content */}
      <Content>
        {/* Header */}
        <Header>
          <h1>Chào, {userData?.user.username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </Header>

        <UserInfo>
          <p>
            <strong>Email:</strong> {userData?.user.email}
          </p>
        </UserInfo>

        <>
          <h2>Khu Vực</h2>
          {loading && projects.length === 0 ? <p>Loading...</p> : <KhuVuc projects={projects} />}
        </>
      </Content>
    </DashboardContainer>
  )
}

export default DashboardInfo
