import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { createProject, getProjectById, updateProject } from '../../services/projectServices'
import { getAllNhienLieu } from '../../services/nhienLieuService'

import ErrorMessage from '../common/ErrorMessage'

interface DongHo {
  tenThuongHieu: string
  loaiDongHo: 'gas' | 'hoi' | 'dau fo'
  isActive: boolean
}

interface NhienLieu {
  _id: string
  tenNhienLieu: string
}

const AddThongTinDongHo = () => {
  const router = useRouter()
  const { projectId, region } = router.query

  const reverseRegionMapping: { [key: string]: number } = {
    'mien-bac': 1,
    'mien-trung': 2,
    'mien-nam': 3,
  }

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    diaChi: '',
    khuVuc: reverseRegionMapping[region as string] || 1,
    dongHo: [] as DongHo[],
    nhienLieu: [] as string[], // Store fuel IDs
    isActive: true,
    congSuat: '',
  })
  const [nhienLieuList, setNhienLieuList] = useState<NhienLieu[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fuels = await getAllNhienLieu()
        setNhienLieuList(fuels)

        if (projectId) {
          const existingProject = await getProjectById(projectId as string)
          setProjectData({
            ...existingProject,
            nhienLieu: existingProject.nhienLieu.map((fuel: NhienLieu) => fuel._id),
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrorMessage('Không thể tải dữ liệu dự án hoặc nhiên liệu.')
      }
    }

    fetchData()
  }, [projectId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProjectData({
      ...projectData,
      [name]: name === 'khuVuc' ? parseInt(value, 10) : name === 'isActive' && e.target instanceof HTMLInputElement ? e.target.checked : value,
    })
  }

  const handleNhienLieuChange = (fuelId: string, isChecked: boolean) => {
    const updatedNhienLieu = isChecked ? [...projectData.nhienLieu, fuelId] : projectData.nhienLieu.filter((id) => id !== fuelId)

    setProjectData({
      ...projectData,
      nhienLieu: updatedNhienLieu,
    })
  }

  const handleDongHoChange = (index: number, field: string, value: string | boolean) => {
    const updatedDongHo = [...projectData.dongHo]
    updatedDongHo[index] = {
      ...updatedDongHo[index],
      [field]: value,
    }
    setProjectData({
      ...projectData,
      dongHo: updatedDongHo,
    })
  }

  const addDongHo = () => {
    setProjectData({
      ...projectData,
      dongHo: [...projectData.dongHo, { tenThuongHieu: '', loaiDongHo: 'gas', isActive: true }],
    })
  }

  const removeDongHo = (index: number) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa Đồng Hồ này không?')

    if (isConfirmed) {
      const updatedDongHo = projectData.dongHo.filter((_, i) => i !== index)
      setProjectData({
        ...projectData,
        dongHo: updatedDongHo,
      })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Ensure congSuat is converted to a string
    const payload = {
      ...projectData,
      congSuat: String(parseInt(projectData.congSuat, 10)), // Convert congSuat to a string
      duAn: 'DefaultProjectName', // Ensure duAn is included
    }

    try {
      if (projectId) {
        await updateProject(projectId as string, payload)
      } else {
        await createProject(payload)
      }

      router.push({
        pathname: '/thong-tin-lo',
        query: { region },
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-unknown
    } catch (error: unknown) {
      console.error('Error:', error)
      const errorMessage = error.response?.data?.error || 'Đã xảy ra lỗi. Vui lòng thử lại.'
      setErrorMessage(errorMessage)
    }
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-md'>
      {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}

      <h1 className='text-xl font-bold mb-6'>{projectId ? 'Cập Nhật Thông Tin Dự Án' : 'Thêm Thông Tin Dự Án'}</h1>

      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Tên Dự Án</label>
          <input
            type='text'
            name='name'
            value={projectData.name}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            placeholder='Nhập tên dự án'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Địa Chỉ</label>
          <input
            type='text'
            name='diaChi'
            value={projectData.diaChi}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            placeholder='Nhập địa chỉ'
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Mô Tả</label>
          <textarea
            name='description'
            value={projectData.description}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            placeholder='Nhập mô tả dự án'
            rows={6}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block mb-2 text-gray-700'>Công Suất</label>
          <input
            type='text'
            name='congSuat'
            value={projectData.congSuat}
            onChange={handleInputChange}
            className='w-full px-4 py-2 border rounded-md'
            placeholder='Nhập công suất'
            required
          />
        </div>

        <h2 className='text-lg font-bold mt-6 mb-2'>Danh Sách Nhiên Liệu</h2>
        <div className='mb-4'>
          {nhienLieuList.length > 0 ? (
            nhienLieuList.map((fuel) => {
              // Match fuel ID with the project's nhienLieu IDs
              const isChecked = projectData.nhienLieu.some((nhienLieuId) => nhienLieuId.toString() === fuel._id.toString())

              return (
                <div key={fuel._id} className='flex items-center mb-2'>
                  <input
                    type='checkbox'
                    id={fuel._id}
                    checked={isChecked} // Bind the isChecked variable
                    onChange={(e) => handleNhienLieuChange(fuel._id, e.target.checked)}
                    className='mr-2'
                  />
                  <label htmlFor={fuel._id} className='text-gray-700'>
                    {fuel.tenNhienLieu}
                  </label>
                </div>
              )
            })
          ) : (
            <p className='text-gray-600'>Không có nhiên liệu để hiển thị.</p>
          )}
        </div>

        <h2 className='text-lg font-bold mt-6 mb-2'>Danh Sách Đồng Hồ</h2>
        {projectData.dongHo.map((dongHo, index) => (
          <div key={index} className='mb-4 border p-4 rounded-md'>
            <label className='block mb-2 text-gray-700'>Tên Thương Hiệu</label>
            <input
              type='text'
              value={dongHo.tenThuongHieu}
              onChange={(e) => handleDongHoChange(index, 'tenThuongHieu', e.target.value)}
              className='w-full px-4 py-2 border rounded-md mb-2'
              placeholder='Tên Thương Hiệu'
              required
            />

            <label className='block mb-2 text-gray-700'>Loại Đồng Hồ</label>
            <select
              value={dongHo.loaiDongHo}
              onChange={(e) => handleDongHoChange(index, 'loaiDongHo', e.target.value)}
              className='w-full px-4 py-2 border rounded-md mb-2'>
              <option value='gas'>Gas</option>
              <option value='hoi'>Hơi</option>
              <option value='dau fo'>Dầu FO</option>
            </select>

            {projectId && (
              <div className='mb-2'>
                <label className='block text-gray-700'>Trạng Thái Hoạt Động</label>
                <input
                  type='checkbox'
                  checked={dongHo.isActive}
                  onChange={(e) => handleDongHoChange(index, 'isActive', e.target.checked)}
                  className='mr-2'
                />
                Hoạt động
              </div>
            )}

            <button type='button' onClick={() => removeDongHo(index)} className='text-red-500'>
              Xóa Đồng Hồ
            </button>
          </div>
        ))}

        <button type='button' onClick={addDongHo} className='w-full bg-gray-500 text-white py-2 px-4 rounded-md mb-4'>
          Thêm Đồng Hồ
        </button>

        <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
          {projectId ? 'Cập Nhật' : 'Gửi'}
        </button>
      </form>
    </div>
  )
}

export default AddThongTinDongHo
