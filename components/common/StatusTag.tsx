import React from 'react'

interface StatusTagProps {
  status: number
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const getStatusDetails = () => {
    switch (status) {
      case 1:
        return { text: 'Bản Nháp', color: 'orange' }
      case 2:
        return { text: 'Công Khai', color: 'green' }
      case 3:
        return { text: 'Bị Từ Chối', color: 'red' }
      default:
        return { text: 'Unknown', color: 'gray' }
    }
  }

  const { text, color } = getStatusDetails()

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: color,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      }}>
      {text}
    </span>
  )
}

export default StatusTag
