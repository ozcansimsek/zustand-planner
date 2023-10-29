import { useBoundStore } from "../store/store";
import { Alert, Snackbar } from "@mui/material";

const Notification = () => {
  const store = useBoundStore();
  const isOpen = !!store.alert;

  const handleClose = () => {
    store.setAlert(undefined);
  };

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {store.alert?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
