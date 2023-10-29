import dayjs from "dayjs";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import EventDialog from "./components/EventDialog";
import { useBoundStore } from "./store/store";
import { useEffect } from "react";
import MainDateTimePicker from "./components/MainDateTimePicker";
import ListEvents from "./components/ListEvents";
import Notification from "./components/Notification";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

function App() {
  const store = useBoundStore();
  const dayjsDate = dayjs(store.selectedDate);
  const thisYear = dayjs().year();

  useEffect(() => {
    store.fetchPublicHolidays((thisYear - 1).toString()); // todo: fetch dynamically
    store.fetchPublicHolidays(thisYear.toString());
    store.fetchPublicHolidays((thisYear + 1).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisYear]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Planner</Typography>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={3} style={{ minWidth: 320 }}>
          <MainDateTimePicker />
        </Grid>
        <Grid item xs>
          <Box display="flex" justifyContent="space-between" padding={4}>
            <Typography variant="h5">
              {store.selectedDate &&
                new Intl.DateTimeFormat(undefined, {
                  dateStyle: "full",
                }).format(dayjsDate.toDate())}
            </Typography>

            <Button
              variant="contained"
              onClick={() => store.setDialogData({ openReason: "create" })}
            >
              Add Event
            </Button>
          </Box>

          <ListEvents />
        </Grid>
      </Grid>
      <EventDialog />
      <Notification />
    </>
  );
}

export default App;
