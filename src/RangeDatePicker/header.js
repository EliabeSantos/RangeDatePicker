import { CalendarLabel } from './style'
export default function CalendarHeader({ value, setValue }) {
  const CurrentMonth = () => {
    return value.format('MMMM')
  }
  const CurrentYear = () => {
    return value.format('YYYY')
  }
  const prevMonth = () => {
    return value.clone().subtract(1, 'month')
  }
  const nextMonth = () => {
    return value.clone().add(1, 'month')
  }
  const thisMonth = () => {
    return value.isSame(new Date(), 'month')
  }
  return (
    <CalendarLabel>
      <button
        onClick={() => {
          if (!thisMonth()) {
            setValue({
              startDate: prevMonth(),
              endDate: value.clone(),
            })
            console.log(value)
          }
        }}
      >
        &#60;
      </button>
      <h1>
        {CurrentMonth()} - {CurrentYear()}
      </h1>
      <button
        onClick={() =>
          setValue({
            startDate: nextMonth(),
            endDate: value.clone().add(2, 'month'),
          })
        }
      >
        &#62;
      </button>
    </CalendarLabel>
  )
}
