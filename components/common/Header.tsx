import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
`

const ProjectName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #4caf50;
  margin-left: 10px;
  display: block;
  text-transform: capitalize;
`

const BackButton = styled.button`
  width: 120px;
  margin-top: 10px;
  background-color: #0077ff;
  color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #002fff;
  }
`

const RightActions = styled.div`
  display: flex;
  gap: 10px;
`

const ActionButton = styled.button<{ bgColor?: string }>`
  background-color: ${({ bgColor }) => bgColor || '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

interface HeaderProps {
  title: string
  rightComponent?: React.ReactNode
  addStatus?: { show: boolean; path?: string; onClick?: () => void }
  uploadStatus?: { show: boolean; onUpload: () => void }
  backStatus?: { show: boolean; path: string; label?: string }
}

const Header: React.FC<HeaderProps> = ({ title, rightComponent, addStatus, uploadStatus, backStatus }) => {
  const router = useRouter()
  const [projectName, setProjectName] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve projectName from localStorage
    const storedProject = localStorage.getItem('selectedProject')
    if (storedProject) {
      const parsedProject = JSON.parse(storedProject)
      setProjectName(parsedProject.projectName || null)
    }
  }, [])

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>
          {title}
          {projectName && <ProjectName>- {decodeURIComponent(projectName)}</ProjectName>}
        </Title>
        <RightActions>
          {/* Render Add Button */}
          {addStatus?.show && (
            <ActionButton
              onClick={() => {
                if (addStatus.onClick) {
                  addStatus.onClick() // Execute the callback if provided
                } else if (addStatus.path) {
                  handleNavigate(addStatus.path) // Navigate to the specified path
                }
              }}
              bgColor='#28a745'>
              Thêm Thông Tin
            </ActionButton>
          )}
          {/* Render Upload Button */}
          {uploadStatus?.show && uploadStatus.onUpload && (
            <ActionButton onClick={uploadStatus.onUpload} bgColor='#ffc107'>
              Upload Dữ Liệu
            </ActionButton>
          )}
          {rightComponent}
        </RightActions>
      </TitleContainer>
      {/* Render Back Button */}
      {backStatus?.show && backStatus.path && (
        <BackButton onClick={() => handleNavigate(backStatus.path)}>{backStatus.label || 'Trở Lại'}</BackButton>
      )}
    </HeaderContainer>
  )
}

export default Header
