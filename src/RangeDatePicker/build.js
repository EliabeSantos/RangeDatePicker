export default function BuildCalendar(value) {
  const startDayCal01 = value.clone().startOf('month').startOf('week')
  const endDayCalendar01 = value.clone().endOf('month').endOf('week')
  const calendar = []
  const day = startDayCal01.clone().subtract(1, 'day')

  while (day.isBefore(endDayCalendar01, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    )
  }
  return calendar
}
