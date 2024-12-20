import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BoilerData {
  id: string
  tenLo: string
  diaChiLo: string
  congSuatLo: string
}

interface BoilerState {
  boilers: BoilerData[]
}

const initialState: BoilerState = {
  boilers: [],
}

export const boilerInfoSlice = createSlice({
  name: 'boilerInfo',
  initialState,
  reducers: {
    addBoiler: (state, action: PayloadAction<BoilerData>) => {
      state.boilers.push(action.payload)
    },
    deleteBoiler: (state, action: PayloadAction<string>) => {
      state.boilers = state.boilers.filter((boiler) => boiler.id !== action.payload)
    },
    updateBoiler: (state, action: PayloadAction<BoilerData>) => {
      const index = state.boilers.findIndex((boiler) => boiler.id === action.payload.id)
      if (index !== -1) {
        state.boilers[index] = action.payload // Update the boiler's details
      }
    },
  },
})

export const { addBoiler, deleteBoiler, updateBoiler } = boilerInfoSlice.actions

export default boilerInfoSlice.reducer
