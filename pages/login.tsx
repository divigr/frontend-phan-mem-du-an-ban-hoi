import { useRouter } from 'next/router'
import Login from '../components/auth/Login'
import { useEffect } from 'react'

const LoginPage = () => {
  const router = useRouter()

  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedToken = localStorage.getItem('token')
      console.log('savedToken', savedToken)
    }
  }, [router])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Login />
    </div>
  )
}

export default LoginPage
