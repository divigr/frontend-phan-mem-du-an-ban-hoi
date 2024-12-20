import { ThongSoVanHanh } from './ThongSoVanHanh'

/**
 * Generates default shift data for a selected date.
 *
 * @param selectedDate - The date for which default shifts are generated.
 * @param projectId - The associated project ID.
 * @returns An array of default `ThongSoVanHanh` objects.
 */
export const generateDefaultShifts = (selectedDate: string, projectId: string): ThongSoVanHanh[] => {
  const shifts: (1 | 2 | 3)[] = [1, 2, 3]

  return shifts.map((ca) => ({
    id: `${selectedDate}-${ca}`,
    projectId,
    ngay: selectedDate,
    ca,
    // Default resource consumption values
    luongHoi: [{ dongHoId: 'defaultId', chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    luongGas: [{ dongHoId: 'defaultId', chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    dienNang: [{ chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    nuocNong: [{ chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    nuocLanh: [{ chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    dauFo: [{ dongHoId: 'defaultId', chiSoDau: 0, chiSoCuoi: 0, luongTieuThu: 0 }],
    // Default metrics
    hoaChat: 0,
    muoi: 0,
    dauDo: 0,
    nhienLieuTonKho: [], // Empty inventory by default
    trangThai: 1, // Default status: Draft
    ngayTao: new Date().toISOString(),
    ngayCapNhat: new Date().toISOString(),
  }))
}
