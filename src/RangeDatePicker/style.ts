import styled from 'styled-components'

export const CalendarInputContainer = styled.section`
  width: 100%;
  max-width: 330px;
  height: 3rem;
  border: 2px solid #e4edec;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  label {
    display: flex;
    flex-direction: column;
    grid-column: span 2;
    p {
      text-align: left;
      font: normal normal normal 12px/22px Poppins;
      letter-spacing: 0px;
      color: #929c9a;
      opacity: 1;
      margin: 0;
    }
    input {
      all: unset;
      height: 1rem;
      color: var(--unnamed-color-1e2543);
      font: normal normal 600 16px Poppins;
      letter-spacing: 0px;
      color: #1e2543;
      opacity: 1;
    }
  }
  svg {
    margin: auto 0 auto 15px;
  }
`

interface ICalendarRef {
  top: number
  left: number
}
export const SelectDateContainer = styled.div<ICalendarRef>`
  width: 620px;
  padding: 10px;
  height: 20rem;
  position: absolute;
  left: ${(props) => props.left}px !important;
  top: ${(props) => props.top + 50}px !important;
  z-index: 10;
  background: white;
  border: 2px solid #e4edec;
  border-radius: 10px;

  display: flex;
  flex-wrap: wrap;
  h1 {
    width: 100%;
  }

  > div {
    display: flex;
    width: 100%;
  }
`

export const Calendar = styled.div`
  width: 300px;

  display: grid;
  grid-template-columns: 1fr;
  .calendar-container {
    padding: 5px;
  }
  .calendar-wrapper {
    display: flex;
  }
  .text-center {
    font: normal normal 600 20px Poppins;
    letter-spacing: 0px;
    color: #1e2543;
    font-weight: 600;
  }
  .Week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .Day {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      height: 100%;
      margin: auto;
      color: #7b694d;
      font-size: 16px;
    }
    display: flex;
    justify-content: center;
    :hover {
      background-color: #62bfb6;
      cursor: pointer;
      opacity: 1;
    }

    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .selected {
    background-color: #62bfb6;

    width: 100% !important;
    height: 100% !important;
    div {
      width: 100% !important;
      height: 100% !important;
      font-size: 22px !important;
    }
  }
  .before {
    background-color: #ccc;
    opacity: 0.5;
    width: 100% !important;
    height: 100% !important;
    cursor: not-allowed;
  }
  .hovered {
    background-color: #62bfb6;
    color: black;
    width: 100% !important;
    height: 70% !important;
    margin: auto;
    opacity: 0.6;
  }
  .today {
    background-color: #ccc;
  }
  .checkout {
    background-color: red;
  }
`

export const CalendarLabel = styled.div`
  width: 300px;
  height: 3rem;
  border: 1px solid #ccc;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  h1 {
    grid-column: span 2;
    text-align: center;
    margin: auto;
    font-size: 16px;
  }
  button {
    width: 40px;
    height: 40px;
    margin: auto;
    background: none;
    border: 2px solid #e4edec;
    border-radius: 10px;
    color: #62bfb6;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
  }
`
