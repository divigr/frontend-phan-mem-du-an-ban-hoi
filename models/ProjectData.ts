// NhienLieu Interface
export interface NhienLieu {
  _id?: string // MongoDB ObjectId as a string
  name: string // Name of the fuel
  description?: string // Optional description of the fuel
}

// DongHo Interface
export interface DongHo {
  _id?: string // MongoDB ObjectId as a string
  tenThuongHieu: string // Brand name of the meter
  loaiDongHo: 'gas' | 'hoi' | 'dau fo' // Type of meter
  isActive: boolean // Whether the meter is active
}

// Project Interface
export interface Project {
  _id?: string // MongoDB ObjectId as a string
  name: string // Project name
  description: string // Project description
  dongHo: DongHo[] // Array of DongHo (meters)
  nhienLieu: string[] // Array of NhienLieu IDs (as strings)
  diaChi: string // Address of the project
  congSuat: number // Capacity of the project
  isActive: boolean // Active status of the project
  khuVuc: number // Region (1: Miền Bắc, 2: Miền Trung, 3: Miền Nam)
  createdAt: string // Project creation date (ISO string)
  updatedAt: string // Project last updated date (ISO string)
}
