import React, { useEffect } from 'react'

interface ErrorMessageProps {
  errorMessage: string | null
  setErrorMessage: (message: string | null) => void
}

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({ errorMessage, setErrorMessage }) => {
  useEffect(() => {
    if (errorMessage) {
      // Tự động xóa lỗi sau 5 giây
      const timeout = setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      return () => clearTimeout(timeout) // Cleanup nếu component bị unmount
    }
  }, [errorMessage, setErrorMessage])

  if (!errorMessage) return null // Không hiển thị gì nếu không có lỗi

  return (
    <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-stone-50	 text-rose-500	 px-4 py-2 rounded shadow-lg text-center'>
      <span>{errorMessage}</span>
      <button
        onClick={() => setErrorMessage(null)} // Xóa lỗi khi người dùng nhấn nút
        className='ml-4 px-3 py-1 bg-red-700 hover:bg-red-800 rounded text-sm text-white	'>
        OK
      </button>
    </div>
  )
}

export default ErrorMessageComponent
