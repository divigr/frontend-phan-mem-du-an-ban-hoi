export interface DonGia {
  _id: string
  loId: string // Reference to `loId` as string since it’s ObjectId in the backend
  doanhThuCoDinh: number
  donGiaBanHoi: number
  donGiaNhienLieu: number
  donGiaDien: number
  donGiaMuoi: number
  donGiaHoaChat: number
  donGiaDauFo: number
  donGiaDauDo: number
  trangThai: number // 1: Draft, 2: Public, 3: Rejected
  ngayGio?: string // Date and time field
  createdAt?: string // Optional, populated by backend
  updatedAt?: string // Optional, populated by backend
}
