import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { loginFailure, loginStart, loginSuccess } from '../../redux/slices/authSlice'
import { registerService } from '../../services/authService'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  const handleRegister = async () => {
    dispatch(loginStart())

    try {
      const data = await registerService({ username, password, email })
      dispatch(loginSuccess(data)) // Auto-login the user after registration
      router.push('/dashboard') // Redirect to dashboard after success
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default RegisterPage
