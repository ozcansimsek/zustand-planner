import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useBoundStore } from "../store/store";
import { HighlightedDays } from "./HighlightedDays";

type FormData = {
  starts: Dayjs | null;
  ends: Dayjs | null;
  title: string;
  description?: string;
};

const EventDialog = () => {
  const store = useBoundStore();
  const dialogData = store.dialogData?.eventData;
  const formDefaults: FormData = {
    starts: null,
    ends: null,
    title: "",
    description: "",
  };

  const [formData, setFormData] = useState<FormData>(formDefaults);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isEndDateValid =
    Number(formData.starts?.toDate().getTime()) <=
    Number(formData.ends?.toDate().getTime());

  const isFormValid =
    typeof formData.title === "string" &&
    formData.title.length > 0 &&
    isEndDateValid;

  const handleSubmit = (event: any) => {
    setIsSubmitted(true);
    event.preventDefault();

    if (isFormValid) {
      if (store.dialogData?.openReason === "edit" && dialogData) {
        store.editEvent({
          id: dialogData?.id,
          starts: formData.starts!.toISOString(),
          ends: formData.ends!.toISOString(),
          title: formData.title,
          description: formData.description,
        });
      } else
        store.addEvent({
          id: crypto.randomUUID(),
          starts: formData.starts!.toISOString(),
          ends: formData.ends!.toISOString(),
          title: formData.title,
          description: formData.description,
        });
      store.setAlert({
        message: "The event was saved successfully.",
        reason: "success",
      });
      store.closeDialog();
    }
  };

  const onClose = () => {
    store.closeDialog();
  };

  const onTransitionExited = () => {
    setFormData(formDefaults);
    setIsSubmitted(false);
  };

  useEffect(() => {
    if (dialogData) {
      setFormData({
        ...dialogData,
        title: dialogData.title,
        starts: dayjs(dialogData.starts),
        ends: dayjs(dialogData.ends),
      });
    }
  }, [dialogData]);

  return (
    <Dialog
      open={!!store.dialogData}
      keepMounted={false}
      maxWidth="lg"
      onClose={onClose}
      onTransitionExited={onTransitionExited}
    >
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box padding={4} display="flex" flexDirection="column" gap={2}>
            <Box>
              <DateTimePicker
                value={formData.starts}
                onChange={(value: Dayjs | null) => {
                  setFormData({ ...formData, starts: value });
                }}
                label="Starts"
                ampm={false}
                ampmInClock={false}
                format="DD.MM.YYYY HH:mm"
                closeOnSelect
                slotProps={{
                  textField: {
                    required: true,
                  },
                }}
                slots={{
                  day: HighlightedDays,
                }}
              />{" "}
              <DateTimePicker
                value={formData.ends}
                label="Ends"
                onChange={(value: Dayjs | null) => {
                  setFormData({ ...formData, ends: value });
                }}
                minDateTime={formData.starts || undefined}
                ampm={false}
                ampmInClock={false}
                format="DD.MM.YYYY HH:mm"
                closeOnSelect
                slotProps={{
                  textField: {
                    required: true,
                    error: isSubmitted && !isEndDateValid,
                    helperText:
                      isSubmitted &&
                      !isEndDateValid &&
                      "End date should be after the starting date",
                  },
                }}
                slots={{
                  day: HighlightedDays,
                }}
              />
            </Box>
            <TextField
              value={formData.title}
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
              label="Title"
              required
            ></TextField>
            <TextField
              value={formData.description}
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
              label="Description"
              rows={3}
              multiline
            ></TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EventDialog;
