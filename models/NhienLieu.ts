export interface NhienLieu {
  _id: string // Unique identifier (from MongoDB _id)
  tenNhienLieu: string // Name of the fuel
  thuongHieu: string // Brand name of the fuel
  createdAt?: string // Optional, populated by backend
  updatedAt?: string // Optional, populated by backend
}
