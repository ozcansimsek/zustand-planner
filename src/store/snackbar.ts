import type {} from "@redux-devtools/extension"; // required for devtools typing
import { StateCreator } from "zustand";
import { StoreMiddleware } from "./store";

export interface Alert {
  reason: "success" | "info" | "error";
  message: string;
}
export interface SnackbarSlice {
  alert?: Alert;
  setAlert: (alert?: Alert) => void;
}

export const createSnackbarSlice: StateCreator<
  SnackbarSlice,
  StoreMiddleware,
  []
> = (set) => ({
  alert: undefined,
  setAlert: (alert) => set(() => ({ alert }), false, "snackbar/alert"),
});
