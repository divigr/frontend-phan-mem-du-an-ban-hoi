import axios from 'axios'
import { thongKeAPI } from './api/api' // Base URL for the API

// Fetch Thống kê theo ngày tháng
export const getThongKeTheoNgayThang = async (params: {
  loId: string
  nam: number
  months?: string
  quy?: number
  filterType: 'thang' | 'quy' | 'nam'
}) => {
  try {
    const response = await axios.get(`${thongKeAPI}/thong-ke`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })
    return response.data
  } catch (error) {
    console.error('Error fetching Thống kê theo ngày tháng:', error)
    throw error
  }
}

// Fetch Doanh thu, chi phí, lợi nhuận
export const getDoanhThuChiPhiLoiNhuan = async (params: {
  loId: string
  nam: number
  months?: string
  quy?: number
  filterType: 'thang' | 'quy' | 'nam'
}) => {
  try {
    const response = await axios.get(`${thongKeAPI}/doanh-thu-chi-phi-loi-nhuan`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching Doanh thu, chi phí, lợi nhuận:', error)
    throw error
  }
}

// Fetch Doanh thu, chi phí, lợi nhuận by region
export const getDoanhThuChiPhiLoiNhuanByRegion = async (params: { nam: number; region: number }) => {
  try {
    const response = await axios.get(`${thongKeAPI}/doanh-thu-chi-phi-loi-nhuan-theo-khu-vuc`, {
      params, // Pass params as query string for GET
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching Doanh thu, chi phí, lợi nhuận by region:', error)
    throw error
  }
}

// Fetch Doanh thu, chi phí, lợi nhuận for all regions
export const getDoanhThuChiPhiLoiNhuanAllRegions = async (params: { nam: number }) => {
  try {
    const response = await axios.get(`${thongKeAPI}/doanh-thu-chi-phi-loi-nhuan-theo-tat-ca-khu-vuc`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching Doanh thu, chi phí, lợi nhuận for all regions:', error)
    throw error
  }
}

export const getDoanhThuChiPhiLoiNhuanByNgay = async (params: { loId: string; nam: number; thang: number; ngay?: number }) => {
  try {
    const response = await axios.get(`${thongKeAPI}/doanh-thu-chi-phi-loi-nhuan-theo-ngay`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })

    return response.data
  } catch (error) {
    console.error('Error fetching Doanh thu, chi phí, lợi nhuận theo ngày:', error)
    throw error
  }
}

export const getChiTietChiSo = async (params: { loId: string; nam: number; thang: number; metric: string }) => {
  try {
    const response = await axios.get(`${thongKeAPI}/bao-cao-chi-tiet-chi-so`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params,
    })

    return response.data.data
  } catch (error) {
    console.error('Error fetching Chi Tiết Chỉ Số:', error)
    throw error
  }
}
