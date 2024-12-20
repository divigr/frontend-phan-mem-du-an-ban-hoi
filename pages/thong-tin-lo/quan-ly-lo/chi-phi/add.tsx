// pages/thong-tin-lo/quan-ly-lo/chi-phi/add.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ChiPhi as ChiPhiModel } from '../../../../models/chiPhi'
import { getChiPhiById, createChiPhi, updateChiPhi } from '../../../../services/chiPhiService'
import AddChiPhiForm from '../../../../components/chiPhi/add'

const AddChiPhi = () => {
  const router = useRouter()
  const { id, idLo } = router.query

  const [formData, setFormData] = useState<Partial<ChiPhiModel>>({})
  const [isDateSelected, setIsDateSelected] = useState<boolean>(false)

  useEffect(() => {
    const fetchChiPhi = async () => {
      if (id) {
        const fetchedChiPhi = await getChiPhiById(id as string)
        setFormData(fetchedChiPhi)
        setIsDateSelected(!!fetchedChiPhi.ngayGio)
      } else if (idLo) {
        setFormData({ loId: idLo as string })
      }
    }

    fetchChiPhi()
  }, [id, idLo])

  const handleSubmit = async (data: ChiPhiModel) => {
    try {
      if (formData._id) {
        await updateChiPhi(formData._id, data)
      } else {
        await createChiPhi(data)
      }
      router.push(`/thong-tin-lo/quan-ly-lo/chi-phi?idLo=${idLo}`)
    } catch (error) {
      console.error('Error saving Chi Phi:', error)
    }
  }

  return <AddChiPhiForm chiPhi={formData as ChiPhiModel} onSubmit={handleSubmit} isDateSelected={isDateSelected} />
}

export default AddChiPhi
