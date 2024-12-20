export interface ChiPhi {
  loId: string // Reference to `loId` as string
  chiPhiLuongNhanCong: number
  chiPhiKhauHao: number
  chiPhiPhanBo: number
  chiPhiLaiVay: number
  chiPhiSuaChuaBaoTri: number
  chiPhiCongTac: number
  chiPhiKhac: number
  chiPhiBHXH: number
  trangThai: number // 1: Draft, 2: Public, 3: Rejected
  createdAt?: string // Optional, populated by backend
  updatedAt?: string // Optional, populated by backend
}
