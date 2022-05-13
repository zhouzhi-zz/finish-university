import dayjs from 'dayjs'

export const date = (d, fmt = 'YYYY-MM-DD') => {
  return dayjs(new Date(d)).format(fmt)
}

export const time = (d, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  return date(d, fmt)
}

export const day = (d, fmt = 'MM-DD') => {
  return date(d, fmt)
}

export const week = () => {
  const now = new Date().getDay()
  return now
}

