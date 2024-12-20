import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { parseCookies } from 'nookies'

// Define the structure of the user object (can be modified based on your API)
interface User {
  id: string
  username: string
  email: string
  status: number
}

// Define the structure of the auth state
interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

// Load token from cookies initially
const cookies = parseCookies()
const initialToken = cookies.token || null

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: { username: string; email: string }; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.loading = false
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.token = null
    },
  },
})

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

// Export reducer
export default authSlice.reducer
