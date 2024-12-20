import moment from 'moment'

export const formatDateToGMT7 = (isoString: string, format: string = 'DD-MM-YYYY'): string => {
  return moment(isoString).utcOffset(7).format(format)
}

export const formatToGMT7 = (isoString: string): string => {
  return moment(isoString).utcOffset(7).format('HH:mm')
}
