import { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Header from '../common/Header'
import { calculateProjectDataByMonth } from '../../services/donGiaService'

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`

const Card = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`

const CardTitle = styled.div`
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`

const DonGiaIndex = () => {
  const router = useRouter()
  const { region, projectId } = router.query

  const cardData = [
    { title: 'Đơn Giá Hơi', image: '/images/lò hơi.jpg', type: 'hoi', apiField: 'hoi' },
    { title: 'Đơn Giá Gas', image: '/images/1636352149-0-s-gas-cam.png', type: 'gas', apiField: 'gas' },
    { title: 'Đơn Giá Dầu FO', image: '/images/dầu fo.jpg', type: 'dau-fo', apiField: 'dauFO' },
    { title: 'Đơn Giá Dầu DO', image: '/images/dau-do-0.25s.jpg', type: 'dau-do', apiField: 'dauDO' },
    { title: 'Đơn Giá Điện', image: '/images/điện.jpg', type: 'dien', apiField: 'dienNang' },
    { title: 'Đơn Giá Nước Lạnh', image: '/images/nước.webp', type: 'nuoc-lanh', apiField: 'nuocLanh' },
    { title: 'Đơn Giá Muối', image: '/images/muoi_epsom_la_gi_cong_dung_cua_muoi_nhu_the_nao_1_2577576b9e.webp', type: 'muoi', apiField: 'muoi' },
    { title: 'Đơn Giá Hóa Chất', image: '/images/dinh-nghia-hoa-chat.jpg', type: 'hoa-chat', apiField: 'hoaChat' },
    { title: 'Đơn Giá Nhiên Liệu', image: '/images/Biomass-la-gi.jpg', type: 'nhien-lieu', apiField: 'nhienLieu' },
  ]

  const handleCardClick = async (card: any) => {
    if (typeof projectId !== 'string' || !projectId) {
      console.error('Invalid projectId')
      return
    }

    const body = {
      month: new Date().toISOString().slice(0, 7),
      limit: 20,
      offset: 0,
      hoi: card.type === 'hoi',
      gas: card.type === 'gas',
      dienNang: card.type === 'dien',
      nuocLanh: card.type === 'nuoc-lanh',
      dauDO: card.type === 'dau-do',
      dauFO: card.type === 'dau-fo',
      muoi: card.type === 'muoi',
      hoaChat: card.type === 'hoa-chat',
      nhienLieu: card.type === 'nhien-lieu',
    }

    try {
      const data = await calculateProjectDataByMonth(projectId, body)

      // Navigate to the detail page, passing type and query parameters
      router.push({
        pathname: `/thong-tin-lo/quan-ly-lo/don-gia/detail-don-gia/${card.type}`,
        query: { projectId, region, type: card.type },
      })
    } catch (error) {
      console.error('Error fetching data for card:', error)
    }
  }

  return (
    <>
      <Header title='Đơn Giá Bán Hơi' backStatus={{ show: true, path: `/thong-tin-lo?region=${region}`, label: 'Trở Lại' }} />
      <CardContainer>
        {cardData.map((card) => (
          <Card key={card.title} onClick={() => handleCardClick(card)}>
            <CardImage src={card.image} alt={card.title} onError={(e) => ((e.target as HTMLImageElement).src = '/images/default.jpg')} />
            <CardTitle>{card.title}</CardTitle>
          </Card>
        ))}
      </CardContainer>
    </>
  )
}

export default DonGiaIndex
