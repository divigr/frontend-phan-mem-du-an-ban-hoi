import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { PageContainer, Section } from '../components/SettingPage/styles/SettingsPage'
import SettingsForm from '../components/SettingPage/SettingsForm'

const SettingsPage = () => {
  return (
    <PageContainer>
      <h1 className='page-title'>Cài Đặt Phần Mềm</h1>
      <Section>
        <SettingsForm />
      </Section>
    </PageContainer>
  )
}

export default SettingsPage

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
