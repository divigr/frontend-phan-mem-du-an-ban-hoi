/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { FC, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { getUserData, UserData } from '../utils/authHelpers'
import styled from 'styled-components'

const HeaderSite: FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const userData: UserData | null = getUserData()

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const getMenuItems = () => {
    switch (userData?.user?.status) {
      case 1:
        return [
          { href: '/', label: 'Trang Chủ' },
          { href: '/users', label: 'Quản Lý Người Dùng' },
          { href: '/nhien-lieu', label: 'Quản Lý Nhiên Liệu' },
          { href: '/settings', label: 'Cài Đặt' },
        ]
      case 2:
        return [
          { href: '/', label: 'Trang Chủ' },
          { href: '/settings', label: 'Cài Đặt' },
        ]
      case 3:
        return [
          { href: '/', label: 'Trang Chủ' },
          { href: '/settings', label: 'Cài Đặt' },
        ]
      case 4:
        return [
          { href: '/', label: 'Trang Chủ' },
          { href: '/settings', label: 'Cài Đặt' },
        ]
      default:
        return [{ href: '/', label: 'Trang Chủ' }]
    }
  }

  const menuItems = getMenuItems()

  return (
    <HeaderWrapper>
      {/* Header for Desktop */}
      <header className='header-container'>
        <div className='header-left'>
          <button className='menu-button md:hidden' onClick={toggleMenu}>
            <Bars3Icon className='menu-icon' />
          </button>
          <img src='/LogoVuong.png' alt='Logo' className='logo' />
        </div>
        <nav className='header-nav hidden md:flex'>
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className='header-right'>{/* Placeholder for Avatar or Additional Actions */}</div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu>
          <div className='menu-header'>
            <h2 className='menu-title'>Menu</h2>
            <button onClick={toggleMenu}>
              <XMarkIcon className='close-icon' />
            </button>
          </div>
          <nav className='menu-nav'>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </MobileMenu>
      )}
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  .header-container {
    background-color: #ed1c24;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .logo {
    height: 3rem; /* Increase the height */
    width: auto; /* Maintain aspect ratio */
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .menu-button {
    display: none; /* Hidden by default */
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
  }

  @media (max-width: 990px) {
    .menu-button {
      display: block; /* Show the button for screens <= 990px */
    }
  }

  .menu-icon {
    height: 1.5rem;
    width: 1.5rem;
  }

  .logo {
    height: 2rem;
    width: auto;
  }

  .header-nav {
    display: flex;
    gap: 1.8rem; /* Increased spacing between nav links */
  }

  .nav-link {
    text-decoration: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    background-color: #ed1c24; /* Background color */
    transition: background-color 0.2s;
    margin: 0; /* No additional spacing needed on individual links */
  }

  .nav-link:hover {
    background-color: #2d3748; /* Hover effect */
  }
`

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  background-color: #ed1c24; /* Tailwind's gray-800 */
  color: white;
  z-index: 50;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .menu-title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .close-icon {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  }

  .menu-nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu-link {
    background-color: #4a5568; /* Tailwind's gray-700 */
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    text-align: center;
    color: white;
    text-decoration: none;
    font-size: 1rem;

    &:hover {
      background-color: #2d3748; /* Tailwind's gray-800 */
    }
  }
`

export default HeaderSite
