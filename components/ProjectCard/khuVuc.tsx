import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../../styles/breakpoints'
import { Project } from '../../models/ProjectData'
import { useRouter } from 'next/router'
import { getUserData, UserData } from '../../utils/authHelpers'
import RevenueTable from './RevenueTable'
import { getDoanhThuChiPhiLoiNhuanAllRegions } from '../../services/baoCaoService'

const RegionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;

  ${media.tablet`
    flex-direction: column; 
    align-items: center;
  `}
`

const Button = styled.button`
  flex: 1;
  max-width: 300px;
  background-color: #ed3237;
  color: #fff;
  padding: 30px 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;

  &:hover {
    background-color: #1f6391;
  }
`

interface KhuVucProps {
  projects: Project[]
}

const KhuVuc: React.FC<KhuVucProps> = ({ projects }) => {
  const router = useRouter()
  const [regionData, setRegionData] = useState([])
  const userData: UserData | null = getUserData()

  const fetchRegionData = async (year: number) => {
    try {
      const response = await getDoanhThuChiPhiLoiNhuanAllRegions({ nam: year })
      setRegionData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    fetchRegionData(currentYear) // Automatically fetch data for the current year on mount
  }, [])

  const countProjectsByRegion = (region: string) => {
    const regionMap: { [key: string]: number } = { 'mien-bac': 1, 'mien-trung': 2, 'mien-nam': 3 }
    const khuVuc = regionMap[region]

    return projects.filter((project) => project.khuVuc === khuVuc).length
  }

  const handleRegionClick = (region: string) => {
    router.push(`/thong-tin-lo?region=${region}`)
  }

  const handleFilterChange = (status: string, value: string | null) => {
    if (status === 'year' && value) {
      const year = parseInt(value, 10) // Convert back to a number if necessary
      fetchRegionData(year) // Call API when the year is selected
    }
  }

  console.log('userData?.user.status', userData?.user.status)

  return (
    <>
      {userData?.user.status === 4 && (
        <RegionButtons>
          {['mien-bac', 'mien-trung', 'mien-nam'].map((region) => (
            <Button key={region} onClick={() => handleRegionClick(region)}>
              {region === 'mien-bac' && `Miền Bắc (${countProjectsByRegion(region)})`}
              {region === 'mien-trung' && `Miền Trung (${countProjectsByRegion(region)})`}
              {region === 'mien-nam' && `Miền Nam (${countProjectsByRegion(region)})`}
            </Button>
          ))}
        </RegionButtons>
      )}

      {(userData?.user.status === 1 || userData?.user.status === 3) && <RevenueTable data={regionData} handleFilterChange={handleFilterChange} />}
    </>
  )
}

export default KhuVuc
