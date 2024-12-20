import React, { useEffect, useState } from 'react'
import { deleteNhienLieu, getAllNhienLieu } from '../../services/nhienLieuService'
import SharedTable from '../common/SharedTable'
import Header from '../common/Header'
import { NhienLieu } from '../../models/NhienLieu'
import AddNhienLieu from './AddNhienLieu'

const NhienLieuComponents: React.FC = () => {
  const [nhienLieuList, setNhienLieuList] = useState<NhienLieu[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNhienLieuId, setSelectedNhienLieuId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllNhienLieu()
        setNhienLieuList(data)
      } catch (error) {
        console.error('Error fetching Nhien Liệu:', error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (item: NhienLieu) => {
    if (window.confirm(`Are you sure you want to delete "${item.tenNhienLieu}"?`)) {
      try {
        await deleteNhienLieu(item._id)
        setNhienLieuList((prev) => prev.filter((nhienLieu) => nhienLieu._id !== item._id))
      } catch (error) {
        console.error('Error deleting Nhiên Liệu:', error)
      }
    }
  }

  const handleEdit = (item: NhienLieu) => {
    setSelectedNhienLieuId(item._id)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedNhienLieuId(undefined)
    setIsModalOpen(true)
  }

  const refreshList = async () => {
    const data = await getAllNhienLieu()
    setNhienLieuList(data)
  }

  return (
    <div>
      <Header
        title='Danh Sách Nhiên Liệu'
        addStatus={{
          show: true,
          onClick: handleAdd,
        }}
        backStatus={{
          show: true,
          path: '/',
          label: 'Trở Lại',
        }}
      />

      <SharedTable
        columns={[
          { key: 'tenNhienLieu', label: 'Tên Nhiên Liệu' },
          { key: 'thuongHieu', label: 'Thương Hiệu' },
          { key: 'actions', label: 'Actions' }, // Thêm cột actions
        ]}
        data={nhienLieuList.map((item) => ({
          ...item,
          actions: (
            <>
              <button onClick={() => handleEdit(item)} className='bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600'>
                Edit
              </button>
              <button onClick={() => handleDelete(item)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'>
                Delete
              </button>
            </>
          ),
        }))}
      />

      <AddNhienLieu isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} nhienLieuId={selectedNhienLieuId} onSuccess={refreshList} />
    </div>
  )
}

export default NhienLieuComponents
