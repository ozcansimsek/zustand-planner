import { StateCreator } from "zustand";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { StoreMiddleware } from "./store";
import { EventData } from "./events";

interface DialogData {
  openReason: "create" | "edit";
  eventData?: EventData;
}

export interface DialogSlice {
  dialogData?: DialogData;
  setDialogData: (data: DialogData) => void;
  closeDialog: () => void;
}

export const createDialogSlice: StateCreator<
  DialogSlice,
  StoreMiddleware,
  []
> = (set) => ({
  dialogData: undefined,
  setDialogData: (data) =>
    set(() => ({ dialogData: data }), false, "dialog/setData"),
  closeDialog: () =>
    set(() => ({ dialogData: undefined }), false, "dialog/close"),
});
