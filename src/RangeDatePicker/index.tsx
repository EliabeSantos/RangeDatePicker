import { useState, useRef, useEffect } from "react";
// import Calendar from 'react-calendar'
import CalendarIcon from "./assets/calendar.svg";
import {
  CalendarInputContainer,
  SelectDateContainer,
  Calendar,
  CalendarLabel,
} from "./style";
import moment from "moment";
import BuildCalendar from "./build";
import dayStyles, { isBeforeToday } from "./makeStyles";
import CalendarHeader from "./header";

interface IDateRangePicker {
  value: any;
  onChange: (e: any) => void;
}
const DateRangePicker: React.FC<IDateRangePicker> = ({ value, onChange }) => {
  const CalendarRef = useRef<HTMLElement>(null);
  const [selectedOne, setSelectedOne] = useState<any>();
  const [selectedTwo, setSelectedTwo] = useState<any>();
  const [CalendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [calendar01, setCalendar01] = useState<Array<any>>([]);
  const [calendar02, setCalendar02] = useState<Array<any>>([]);
  const [HoverSelected, setHoverSelected] = useState({
    dayHovered: moment(),
    calendarHovered: 0,
  });

  useEffect(() => {
    setCalendar01(BuildCalendar(value.startDate));
    setCalendar02(BuildCalendar(value.endDate));

    console.log(selectedTwo, selectedTwo);
  }, [value]);
  useEffect(() => {
    console.log(selectedTwo, selectedOne);
    if (selectedOne && selectedTwo) {
      onChange({ startDate: selectedOne, endDate: selectedTwo });
      setCalendarVisible(false);
    }
  }, [selectedTwo, selectedTwo]);
  useEffect(() => {
    onChange({
      startDate: value.startDate,
      endDate: moment(value.endDate.clone()),
    });
  }, [CalendarVisible]);
  useEffect(() => {
    onChange({ ...value, endDate: value.endDate.clone().add(1, "month") });
  }, []);

  return (
    <>
      <CalendarInputContainer ref={CalendarRef}>
        <CalendarIcon />
        <label>
          <p>Check-in</p>
          <input
            value={selectedOne ? selectedOne.format("DD/MM/YYYY") : null}
            onClick={() => {
              setSelectedOne(""),
                setSelectedTwo(""),
                setCalendarVisible(true),
                onChange({
                  startDate: moment(),
                  endDate: moment().add(1, "month"),
                });
            }}
            placeholder="dd/mm/aaaa"
          />
        </label>
        <label>
          <p>Check-out</p>
          <input
            value={selectedTwo ? selectedTwo.format("DD/MM/YYYY") : null}
            placeholder="dd/mm/aaaa"
          />
        </label>
      </CalendarInputContainer>
      {CalendarVisible && (
        <>
          <SelectDateContainer
            left={CalendarRef?.current?.offsetLeft!}
            top={CalendarRef?.current?.offsetTop!}
          >
            <>
              <h1>
                {selectedOne
                  ? String(
                      HoverSelected.dayHovered.diff(value.startDate, "days")
                    )
                  : null}
                Dias
              </h1>
              <div>
                <div>
                  <CalendarHeader value={value.startDate} setValue={onChange} />
                  <Calendar>
                    {calendar01.map((week: any, index) => (
                      <div key={index} className="Week">
                        {week.map((currentDay: any, i: any) => {
                          if (
                            Number(currentDay.format("D")) > 7 &&
                            index === 0
                          ) {
                            return <div className="Day"></div>;
                          }
                          if (
                            Number(currentDay.format("D")) < 7 &&
                            index >= calendar01.length - 1
                          ) {
                            return <div className="Day"></div>;
                          }

                          return (
                            <div
                              key={i}
                              onMouseEnter={(e: any) => {
                                setHoverSelected({
                                  calendarHovered: 0,
                                  dayHovered: moment(currentDay.clone()),
                                });
                              }}
                              onClick={() => {
                                if (!isBeforeToday(currentDay)) {
                                  if (!selectedOne) {
                                    setSelectedOne(moment(currentDay));
                                  } else if (!selectedTwo) {
                                    setSelectedTwo(moment(currentDay));
                                  } else {
                                    setSelectedOne("");

                                    setSelectedTwo("");
                                  }
                                }
                              }}
                              className={
                                (currentDay.isBefore(
                                  HoverSelected.dayHovered
                                ) &&
                                  currentDay.isAfter(selectedOne)) ||
                                (HoverSelected.calendarHovered &&
                                  currentDay.isAfter(selectedOne))
                                  ? `Day hovered`
                                  : currentDay.isSame(selectedTwo, "day")
                                  ? `Day checkout`
                                  : "Day"
                              }
                            >
                              <div
                                className={dayStyles(
                                  currentDay,
                                  value.startDate,
                                  selectedOne
                                )}
                              >
                                {currentDay.format("D")}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </Calendar>
                </div>
                <div>
                  <CalendarHeader value={value.endDate} setValue={onChange} />
                  <Calendar>
                    {calendar02.map((week: any, index) => (
                      <div key={index} className="Week">
                        {week.map((currentDay: any) => {
                          if (
                            Number(currentDay.format("D")) > 7 &&
                            index === 0
                          ) {
                            return <div className="Day"></div>;
                          }
                          if (
                            Number(currentDay.format("D")) < 7 &&
                            index >= calendar02.length - 1
                          ) {
                            return <div className="Day"></div>;
                          }
                          return (
                            <div
                              onMouseEnter={(e: any) =>
                                setHoverSelected({
                                  calendarHovered: 0,
                                  dayHovered: moment(currentDay.clone()),
                                })
                              }
                              onClick={() => {
                                if (selectedOne) {
                                  onChange({ ...value, endDate: currentDay });
                                  setSelectedTwo(moment(currentDay));
                                }
                                if (!selectedOne) {
                                  setSelectedOne(moment(currentDay));
                                }
                              }}
                              className={
                                currentDay.isBefore(HoverSelected.dayHovered) &&
                                selectedOne &&
                                currentDay.isAfter(selectedOne)
                                  ? `Day hovered`
                                  : `Day`
                              }
                            >
                              <div
                                className={dayStyles(
                                  currentDay,
                                  value.endDate,
                                  selectedOne
                                )}
                              >
                                {currentDay.format("D")}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </Calendar>
                </div>
              </div>
            </>
          </SelectDateContainer>
        </>
      )}
    </>
  );
};
export default DateRangePicker;
module.exports = DateRangePicker;
