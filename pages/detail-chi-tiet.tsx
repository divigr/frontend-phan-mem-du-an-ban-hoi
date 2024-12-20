import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getChiTietChiSo } from '../services/baoCaoService'
import DetailGiaTriChiTiet from '../components/DetailGiaTriChiTiet'
import Header from '../components/common/Header'

const DetailChiTiet = () => {
  const router = useRouter()
  const { loId, nam, thang, metric, projectName } = router.query

  const [data, setData] = useState<unknown>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!loId || !nam || !thang || !metric) return

      try {
        setIsLoading(true)
        const response = await getChiTietChiSo({
          loId: loId as string,
          nam: parseInt(nam as string, 10),
          thang: parseInt(thang as string, 10),
          metric: metric as string,
        })

        setData(response)
        setErrorMessage(null)
      } catch (error: unknown) {
        console.error('Error fetching Chi Tiết Chỉ Số:', error)
        setData(null)
        setErrorMessage(error.message || 'Có lỗi xảy ra khi tải dữ liệu.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [loId, nam, thang, metric])

  return (
    <div>
      <Header title='Chi Tiết Chỉ Số' projectName={projectName} />

      {errorMessage ? <p>{errorMessage}</p> : <DetailGiaTriChiTiet data={data} loading={isLoading} metric={metric} />}
    </div>
  )
}

export default DetailChiTiet
