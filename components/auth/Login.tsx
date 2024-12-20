import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { RootState } from '../../redux/store'
import { loginFailure, loginSuccess } from '../../redux/slices/authSlice'
import { loginService } from '../../services/authService'
import styled from 'styled-components'

// Styled components
const BackgroundLogin = styled.div`
  position: relative;
  background-image: url('/bg/background-divi.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`

const LoginContainer = styled.div`
  position: relative;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Đảm bảo căn giữa theo chiều ngang */
`

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
  cursor: pointer;
`

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: #7f8c8d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #2980b9;
  }
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`

const LoginPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const defaultAvatar = '/LogoVuong.png'

  const handleLogin = async () => {
    try {
      const data = await loginService(username, password)

      if (data.user) {
        dispatch(loginSuccess({ user: data.user, token: data.token }))

        setTimeout(() => {
          router.push('/')
        }, 0)
      } else {
        throw new Error('No user found in response')
      }
    } catch (err) {
      dispatch(loginFailure(err.message))
      console.error('Login failed:')
    }
  }
  const handleLogoClick = () => {
    router.push('/dashboard')
  }
  return (
    <BackgroundLogin>
      <LoginContainer>
        <Logo src={defaultAvatar} alt='Logo Divi Group' onClick={handleLogoClick} />
        <Title>Login</Title>
        <Input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        {error && <ErrorText>{error}</ErrorText>}
      </LoginContainer>
    </BackgroundLogin>
  )
}

export default LoginPage
