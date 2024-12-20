import dayjs from 'dayjs'

export const formatDateTime = (dateTime: string): string => {
  return dayjs(dateTime).format('DD/MM/YYYY - HH:mm')
}
