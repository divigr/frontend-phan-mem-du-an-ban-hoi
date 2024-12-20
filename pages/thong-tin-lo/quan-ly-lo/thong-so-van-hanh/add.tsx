import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ThongSoVanHanh } from '../../../../models/ThongSoVanHanh'
import { getThongSoVanHanhTheoLo } from '../../../../services/thongSoDauVaoService'
import AddOperationalParameter from '../../../../components/Thong_So_Van_Hanh/add'

const AddInfoThongSoVanHanh = () => {
  const router = useRouter()
  const { id } = router.query
  const [thongSoVanHanh, setThongSoVanHanh] = useState<ThongSoVanHanh | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchThongSoVanHanh = async () => {
      if (id) {
        setLoading(true) // Bắt đầu trạng thái loading
        try {
          const data = await getThongSoVanHanhTheoLo(id as string) // Lấy dữ liệu thông số vận hành
          setThongSoVanHanh(data)
        } catch (error) {
          console.error('Error fetching operational parameter:', error)
        } finally {
          setLoading(false) // Kết thúc loading dù có lỗi hay không
        }
      } else {
        setLoading(false)
      }
    }

    fetchThongSoVanHanh()
  }, [id])

  if (loading) {
    return <div>Loading...</div> // Show loading message or spinner
  }

  return <AddOperationalParameter thongSoVanHanh={thongSoVanHanh} />
}
export default AddInfoThongSoVanHanh
