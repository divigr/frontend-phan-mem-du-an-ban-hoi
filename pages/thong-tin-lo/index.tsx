import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import QuanLyThongTinLo from '../../components/Thong_Tin_Lo'

const ThongTinLo_Index = () => {
  return (
    <div className='p-4'>
      <QuanLyThongTinLo />
    </div>
  )
}

export default ThongTinLo_Index

// Server-side token check
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context)
  const token = cookies.token

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
