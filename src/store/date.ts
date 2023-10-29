import type {} from "@redux-devtools/extension"; // required for devtools typing
import { StateCreator } from "zustand";
import { StoreMiddleware } from "./store";
import dayjs from "dayjs";

export interface DateSlice {
  selectedDate: string | null;
  setSelectedDate: (time: string | null) => void;
}

export const createDateSlice: StateCreator<DateSlice, StoreMiddleware, []> = (
  set
) => ({
  selectedDate: dayjs().toISOString(),
  setSelectedDate: (date) =>
    set(() => ({ selectedDate: date }), false, "date/setSelectedDate"),
});
