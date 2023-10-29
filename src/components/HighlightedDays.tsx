import { Badge, Tooltip } from "@mui/material";
import { PickersDayProps, PickersDay } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import StarsIcon from "@mui/icons-material/Stars";
import { useBoundStore } from "../store/store";

export const HighlightedDays = (props: PickersDayProps<Dayjs>) => {
  const { day, outsideCurrentMonth, ...other } = props;
  const store = useBoundStore();

  const findHolidaysByDateAndMonth = () => {
    let foundHoliday = null;

    for (const year in store.holidays) {
      if (store.holidays.hasOwnProperty(year)) {
        foundHoliday = store.holidays[year].find((holiday) => {
          return (
            dayjs(holiday.date).isSame(props.day) && !props.outsideCurrentMonth
          );
        });

        if (foundHoliday) {
          break;
        }
      }
    }

    return foundHoliday;
  };

  return (
    <Tooltip title={findHolidaysByDateAndMonth()?.localName || ""}>
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          !!findHolidaysByDateAndMonth() ? (
            <StarsIcon color="error" fontSize="small" />
          ) : undefined
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    </Tooltip>
  );
};
