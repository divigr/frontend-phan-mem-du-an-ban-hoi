// redux/slices/fuelSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FuelInput {
  id: string
  boilerId: string
  dateTime: string
  sku: string
  soPhieuCan: string
  soThuTuXe: string
  chatLuongNhienLieu: string
  bienSoXe: string
  khoiLuongTongXe: number
  khoiLuongXe: number
  khoiLuongHang: number
  loaiHang: string
  doAm: number
  nhaCungCap: string
  nguoiNhanHang: string
}

interface FuelState {
  fuelInputs: FuelInput[]
}

const initialState: FuelState = {
  fuelInputs: [],
}

const fuelSlice = createSlice({
  name: 'fuel',
  initialState,
  reducers: {
    addFuelInput: (state, action: PayloadAction<FuelInput>) => {
      state.fuelInputs.push(action.payload)
    },
    deleteFuelInput: (state, action: PayloadAction<string>) => {
      state.fuelInputs = state.fuelInputs.filter((input) => input.id !== action.payload)
    },
    updateFuelInput: (state, action: PayloadAction<FuelInput>) => {
      const index = state.fuelInputs.findIndex((input) => input.id === action.payload.id)
      if (index !== -1) {
        state.fuelInputs[index] = action.payload
      }
    },
  },
})

export const { addFuelInput, deleteFuelInput, updateFuelInput } = fuelSlice.actions
export default fuelSlice.reducer
