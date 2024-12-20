import React, { useEffect } from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f4847e; /* Bright red for prominence */
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  z-index: 1000;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for prominence */
`

const CloseButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  background-color: white;
  color: rgba(255, 69, 58, 1);
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: rgba(255, 200, 200, 1);
  }
`

interface ErrorMessageProps {
  message: string
  onClose: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000) // Automatically close after 2 seconds

    return () => clearTimeout(timer) // Cleanup the timer
  }, [onClose])

  return (
    <ErrorContainer>
      {message}
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ErrorContainer>
  )
}

export default ErrorMessage
