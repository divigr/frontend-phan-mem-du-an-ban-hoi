import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getDonGiaById } from '../../../../services/donGiaService'
import { DonGia } from '../../../../models/donGia'
import AddDonGiaForm from '../../../../components/DonGia/add'

const AddInfoDonGia = () => {
  const router = useRouter()
  const { id } = router.query
  const [donGia, setDonGia] = useState<DonGia | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchDonGia = async () => {
      if (id) {
        setLoading(true)
        try {
          const data = await getDonGiaById(id as string)
          setDonGia(data)
        } catch (error) {
          console.error('Error fetching DonGia data:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchDonGia()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  return <AddDonGiaForm donGia={donGia} />
}

export default AddInfoDonGia
