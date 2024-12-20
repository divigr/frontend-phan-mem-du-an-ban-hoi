import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styled from 'styled-components'
import { getUserData, UserData } from '../utils/authHelpers'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}
const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const router = useRouter()
  const userData: UserData | null = getUserData()

  const getTitle = () => {
    switch (router.asPath) {
      case '/':
        return 'Dashboard'
      case '/info-user':
        return 'Thông Tin Người Dùng'
      case '/thong-tin-lo':
      case '/thong-tin-lo/add':
        return 'Thông Tin Lò'
      case '/thong-tin-lo/quan-ly-lo':
      case '/thong-tin-lo/quan-ly-lo/add':
        return 'Quản Lý Lò Hơi'
      case '/quan-ly-nguoi-dung':
        return 'Quản Lý Người Dùng'
      case '/tong-quan':
        return 'Tổng Quan'
      case '/settings':
        return 'Cài Đặt'
      default:
        return 'Dashboard'
    }
  }

  return (
    <SidebarWrapper isOpen={isOpen}>
      {/* Sidebar cho màn hình lớn */}
      <div className={`slider-bar w-64 bg-gray-800 text-white p-4 h-screen md:block hidden`}>
        <h2 className='text-2xl font-bold mb-6'>{getTitle()}</h2>
        <nav className='flex-1 space-y-4'>
          <Link href='/' className='block p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>
            Trang Chủ
          </Link>
          {userData?.user?.status === 1 && (
            <Link href='/users' className='block p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>
              Quản Lý Người Dùng
            </Link>
          )}

          <Link href='/settings' className='block p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>
            Cài Đặt
          </Link>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-gray-800 text-white p-4 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform md:hidden`}>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Dashboard</h2>
          <button onClick={toggleSidebar}>
            <XMarkIcon className='h-6 w-6' />
          </button>
        </div>
        <nav className='flex-1 space-y-4'>
          <Link href='/' className='block p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>
            Trang Chủ
          </Link>
          {userData?.user?.status === 1 && (
            <Link href='/users' className='block p-3 bg-gray-700 hover:bg-gray-600 rounded-md'>
              Quản Lý Người Dùng
            </Link>
          )}
        </nav>
      </div>

      {/* Overlay để đóng sidebar khi bấm bên ngoài */}
      {isOpen && <div className='fixed inset-0 z-30 bg-black opacity-50 md:hidden' onClick={toggleSidebar} />}
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.div<{ isOpen: boolean }>`
  width: 16rem;
  background-color: #ee3237;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};

  @media (min-width: 768px) {
    transform: translateX(0);
  }
  .slider-bar {
    background-color: #ee3237;
    margin: 58px 0;
  }
`

export default Sidebar
