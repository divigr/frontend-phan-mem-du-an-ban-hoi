export interface ConsumptionWithDongHo {
  dongHoId: string // Meter reference (MongoDB ObjectId)
  chiSoDau: number // Start value
  chiSoCuoi: number // End value
  luongTieuThu?: number // Computed consumption
}

export interface ConsumptionWithoutDongHo {
  chiSoDau: number // Start value
  chiSoCuoi: number // End value
  luongTieuThu?: number // Computed consumption
}

export interface InventoryTotal {
  tenNhienLieu: string
  loaiNhienLieu: string // Type of fuel
  thuongHieu: string
  totalSoLuong: number // Quantity
}

// Interface for each operational data entry
export interface ThongSoVanHanh {
  id: string
  projectId: string // Reference to the Project ID (MongoDB ObjectId)
  ca: 1 | 2 | 3 // Shift (Ca làm việc)
  ngay: string // Date of data entry (ISO 8601 string)

  // Consumption data for various resources
  luongHoi: ConsumptionWithDongHo[] // Steam consumption
  luongGas: ConsumptionWithDongHo[] // Gas consumption
  dienNang: ConsumptionWithoutDongHo[] // Electricity consumption
  nuocNong: ConsumptionWithoutDongHo[] // Hot water consumption
  nuocLanh: ConsumptionWithoutDongHo[] // Cold water consumption
  dauFo: ConsumptionWithDongHo[] // FO oil consumption

  // Additional metrics
  hoaChat: number // Amount of chemicals used
  muoi: number // Amount of salt used
  dauDo: number // Diesel (DO) fuel used

  // Fuel inventory
  nhienLieuTonKho: {
    loaiNhienLieu: {
      tenNhienLieu: string
      thuongHieu: string
    } // Type of fuel (MongoDB ObjectId)
    soLuong: number // Quantity
  }[]

  // Metadata
  trangThai: 1 | 2 | 3 // Status: 1 = Draft, 2 = Published, 3 = Rejected
  ngayTao: string // Creation date (ISO 8601 string)
  ngayCapNhat: string // Update date (ISO 8601 string)
}

// Interface for aggregated data for index views
export interface ThongSoVanHanhIndexProps {
  ngay: string // Aggregated date
  totalLuongHoi: number // Total steam collected
  totalLuongGas: number
  totalDienNang: number // Total electricity consumption
  totalNuocNong: number // Total hot water consumption
  totalNuocLanh: number // Total cold water consumption
  totalHoaChat: number // Total chemicals used
  totalMuoi: number // Total salt used
  totalDauDo: number // Total diesel fuel used
  totalDauFo: number // Total FO oil used
  inventoryTotals: InventoryTotal[] // Fuel inventory summary
}
