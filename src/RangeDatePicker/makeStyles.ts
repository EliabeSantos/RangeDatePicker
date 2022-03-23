const isSelected = (day: any, value: any, selectedOne: any) => {
  return day?.isSame(selectedOne, 'day') && day.isSame(selectedOne, 'month')
}
export const isBeforeToday = (day: any) => {
  return day.isBefore(new Date(), 'day')
}

const isToday = (day: any) => {
  return day.isSame(new Date(), 'day')
}

export default function dayStyles(day: any, value: any, selectedOne: any) {
  if (isSelected(day, value, selectedOne)) return 'selected'
  if (isBeforeToday(day)) return 'before'

  if (isToday(day)) return 'today'
  return ''
}
