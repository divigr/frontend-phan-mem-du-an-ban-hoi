import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useRouter } from 'next/router'
import BaoCaoDoanhThu from '../components/BaoCaoDoanhThuPage'
import Header from '../components/common/Header'

const BaoCaoDoanhThuPage = () => {
  const router = useRouter()
  const { loId, nam, projectName } = router.query

  if (!loId || !nam) {
    return (
      <div className='p-4'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'>
          <span className='block sm:inline'>Dữ liệu không hợp lệ. Vui lòng kiểm tra URL.</span>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4'>
      <Header title='Báo Cáo Doanh Thu, Chi Phí, Lợi Nhuận' projectName={projectName} />
      <BaoCaoDoanhThu loId={loId as string} nam={parseInt(nam as string, 10)} />
    </div>
  )
}

export default BaoCaoDoanhThuPage

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
