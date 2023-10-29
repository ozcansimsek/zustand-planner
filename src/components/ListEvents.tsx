import { useBoundStore } from "../store/store";
import dayjs from "dayjs";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ListEvents = () => {
  const store = useBoundStore();
  const selectedDate = dayjs(store.selectedDate);

  const filteredEvents = store.events.filter((event) => {
    return dayjs(selectedDate).isBetween(
      dayjs(event.starts),
      dayjs(event.ends),
      "day",
      "[]"
    );
  });

  const onRemoveEvent = (eventId: string) => {
    store.removeEvent(eventId);
    store.setAlert({
      reason: "success",
      message: "The event was deleted successfully.",
    });
  };

  return (
    <Box
      display="flex"
      gap={2}
      flexDirection="column"
      padding={4}
      justifyContent="center"
    >
      {filteredEvents.map((event) => {
        const startsDayjs = dayjs(event.starts);
        const endsDayjs = dayjs(event.ends);

        const formattedStartDate = new Intl.DateTimeFormat(undefined, {
          dateStyle: "full",
          timeStyle: "medium",
        }).format(startsDayjs.toDate());

        const formattedEndDate = new Intl.DateTimeFormat(undefined, {
          dateStyle: "full",
          timeStyle: "medium",
        }).format(endsDayjs.toDate());

        return (
          <Card key={event.id}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                pr={4}
              >
                <Box>
                  <Typography variant="h5">{event.title}</Typography>
                  <Typography variant="body2">{event.description}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    Starts: {formattedStartDate}
                  </Typography>
                  <Typography variant="body2">
                    Ends: {formattedEndDate}
                  </Typography>
                </Box>
              </Box>

              <Box whiteSpace="nowrap">
                <IconButton
                  onClick={() =>
                    store.setDialogData({
                      openReason: "edit",
                      eventData: event,
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onRemoveEvent(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default ListEvents;
