import { ReactNode } from 'react'
import styled from 'styled-components'

import HeaderSite from './HeaderSite'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutWrapper>
      <div className='flex h-screen'>
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}

        <div className='flex-1 flex flex-col'>
          <HeaderSite />

          {/* Content */}
          <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>{children}</main>
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default Layout

const LayoutWrapper = styled.div`
  .logo_image {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
  .sidebar-backgound {
    background-color: #ee3237;
  }
  .avatar-app {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`
