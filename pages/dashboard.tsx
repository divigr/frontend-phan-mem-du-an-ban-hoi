// dashboard.tsx (HomePageApp.js)
import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { media } from '../styles/breakpoints'

// Container chính cho trang với hình nền và lớp phủ
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('/bg/banner-divi.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;

  /* Lớp phủ mờ màu xám */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(128, 128, 128, 0.5); /* Màu xám với độ mờ */
    z-index: 1; /* Đảm bảo lớp phủ nằm trên ảnh nền */
  }
`

// Wrapper cho các nút với nền trong suốt
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 70px;
  border-radius: 10px;
  z-index: 2;
`

// Định dạng các nút
const Button = styled.button`
  margin: 10px;
  padding: 35px 40px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  background-color: #ed3237;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 300px;

  &:hover {
    background-color: #45a049;
  }
  ${media.tablet`
    width: 200px;
    padding: 25px 30px;
    font-size: 18px;
  `}

  ${media.mobile`
    width: 100%;
    padding: 20px;
    font-size: 16px;
  `}
`

const HomePageApp = () => {
  const router = useRouter()

  const handleNavigation = (role: string) => {
    router.push(`/login?role=${role}`)
  }

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => handleNavigation('admin')}>ADMIN</Button>
        <Button onClick={() => handleNavigation('nhaplieu')}>NHẬP LIỆU</Button>
        <Button onClick={() => handleNavigation('ketoan')}>KẾ TOÁN</Button>
      </ButtonContainer>
    </Container>
  )
}

export default HomePageApp
