import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AddFuelInput from '../../../../components/Nhien_Lieu_Dau_Vao/add'
import { getFuelInputById } from '../../../../services/nhienLieuDauVao'
import { FuelInput } from '../../../../models/FuelInput'

const AddInfoBoiler = () => {
  const router = useRouter()
  const { id } = router.query
  const [fuelInput, setFuelInput] = useState<FuelInput | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchFuelInput = async () => {
      if (id) {
        setLoading(true) // Start loading
        try {
          const data = await getFuelInputById(id as string)

          setFuelInput(data)
        } catch (error) {
          console.error('Error fetching fuel input:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchFuelInput()
  }, [id])

  if (loading) {
    return <div>Loading...</div> // Show loading message or spinner
  }

  return <AddFuelInput fuelInput={fuelInput} />
}

export default AddInfoBoiler
