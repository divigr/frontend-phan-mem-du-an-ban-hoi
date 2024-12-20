import { useState } from 'react'
import { AvatarImage, AvatarWrapper, Form, Input, SaveButton } from './styles/SettingsPage'

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    email: '',
    username: '',
    avatar: '/default-avatar.png',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    // TODO: Save logic (e.g., API call)
    console.log('Saving data:', formData)
  }

  return (
    <Form>
      <label>
        Current Password:
        <Input type='password' name='currentPassword' value={formData.currentPassword} onChange={handleInputChange} />
      </label>

      <label>
        New Password:
        <Input type='password' name='newPassword' value={formData.newPassword} onChange={handleInputChange} />
      </label>

      <label>
        Email:
        <Input type='email' name='email' value={formData.email} onChange={handleInputChange} />
      </label>

      <label>
        Username:
        <Input type='text' name='username' value={formData.username} onChange={handleInputChange} />
      </label>

      <AvatarWrapper>
        <h2 className='form-title'>Avatar</h2>
        <AvatarImage src={formData.avatar} alt='User Avatar' />
        <label>
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = () => setFormData({ ...formData, avatar: reader.result as string })
                reader.readAsDataURL(file)
              }
            }}
          />
        </label>
      </AvatarWrapper>

      <SaveButton onClick={handleSave}>Save</SaveButton>
    </Form>
  )
}

export default SettingsForm
