import { StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useBoundStore } from "../store/store";
import { HighlightedDays } from "./HighlightedDays";

const MainDateTimePicker = () => {
  const store = useBoundStore();
  const dayjsDate = dayjs(store.selectedDate);

  return (
    <StaticDatePicker
      value={dayjsDate}
      slots={{
        day: HighlightedDays,
      }}
      slotProps={{
        actionBar: { actions: ["today", "clear"] },
      }}
      onChange={(value: Dayjs | null) => {
        store.setSelectedDate(value?.toISOString() || null);
      }}
    />
  );
};

export default MainDateTimePicker;
