import styled from 'styled-components'

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;

  .page-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;

  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`

export const SaveButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`

export const AvatarWrapper = styled.div`
  text-align: center;

  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const AvatarImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
`
