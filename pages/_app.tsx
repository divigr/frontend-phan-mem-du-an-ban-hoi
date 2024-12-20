import { Provider } from 'react-redux'
import store from '../redux/store'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import setupAxiosInterceptors from '../utils/axiosInterceptors'
import HomePageApp from './dashboard'
import Login from '../components/auth/Login'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true) // Added loading state

  useEffect(() => {
    setupAxiosInterceptors(router)

    // Check for token in localStorage and update state
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    setToken(savedToken)

    // Simulate token loading and update state
    setIsLoading(false) // No longer showing loading state after token is loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoading) return // Skip routing logic during the initial loading phase

    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    setToken(savedToken)

    // Redirect if no token is found on protected routes
    if (!savedToken && router.pathname !== '/login' && router.pathname !== '/register') {
      router.push('/')
    }
  }, [router, token, isLoading]) // Watch isLoading to skip logic during initial load

  if (isLoading) {
    // Optionally, show a loading indicator during initial load
    return <div>Loading...</div>
  }

  return (
    <Provider store={store}>
      <ToastContainer position='top-right' autoClose={5000} hideProgressBar={false} />

      {token ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : router.pathname === '/' ? (
        <HomePageApp />
      ) : (
        <Login />
      )}
    </Provider>
  )
}

export default MyApp
