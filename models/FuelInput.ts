export interface FuelInput {
  _id: string // Unique identifier
  projectId: string // Reference to Project (converted to string from ObjectId)
  gioVao: string // Entry time (ISO string for consistency)
  gioRa: string // Exit time (ISO string for consistency)
  soThuTuXe: number // Vehicle serial number
  tenNguoiNhap: string // Person entering the data
  soPhieuCan: string // Weight ticket number
  chatLuong: string // Fuel quality
  bienSoXe: string // License plate
  maLoaiHang: string // Cargo type
  khoiLuongTong: number // Total weight (kg)
  khoiLuongXe: number // Vehicle weight (kg)
  khoiLuongHang: number // Cargo weight (kg)
  loaiNhienLieu: { id: string; name: string } // Fuel type reference (converted from ObjectId)
  nguoiNhanHang: string // Person receiving the fuel
  nhaCungCap: string // Supplier
  diaChiXuatHang: string // Export address
  ngayPhieuCan: string // Date recorded on the weight ticket (ISO string)
  ngayLieuVeLo: string // Date material is received (ISO string)
  ghiChu?: string // Notes
  trangThai: number // Status: 1. Draft, 2. Published, 3. Rejected
  ngayTao: string // Created date (ISO string)
  ngayCapNhat: string // Updated date (ISO string)
}

export interface FuelState {
  data: FuelInput[] // API response contains a `data` field with an array of FuelInput
  message: string // Optional: If your API includes a message field
  success: boolean // Optional: If your API includes a success status
}

export interface FuelData {
  date: string // Date in YYYY-MM-DD format
  totalKhoiLuongHang: number // Total weight of goods (in tons)
  totalSoThuTuXe: number // Total number of vehicles
}
