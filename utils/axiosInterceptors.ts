// src/utils/axiosInterceptors.ts
import axios from 'axios'
import { NextRouter } from 'next/router'

const setupAxiosInterceptors = (router: NextRouter) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('sadsa', error)

      if (error.response && error.response.status === 403) {
        const message = error.response.data.message

        if (message === 'Invalid token') {
          // toast.error('Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.')
          localStorage.removeItem('token')
          router.push('/login')
        }
      }
      return Promise.reject(error)
    }
  )
}

export default setupAxiosInterceptors
