import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import BaoCaoChiTiet from '../components/BaoCaoChiTietPage'

const BaoCaoChiTietPage = () => {
  return (
    <div className='p-4'>
      <BaoCaoChiTiet />
    </div>
  )
}

export default BaoCaoChiTietPage

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
