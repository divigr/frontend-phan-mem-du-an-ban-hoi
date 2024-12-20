import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const useAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login') // Redirect to login if no token is found
    }
  }, [router])

  return null
}
