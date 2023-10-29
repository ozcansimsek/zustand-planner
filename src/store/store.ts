// @ts-nocheck
import { create } from "zustand";
import { DateSlice, createDateSlice } from "./date";
import { EventsSlice, createEventsSlice } from "./events";
import { DialogSlice, createDialogSlice } from "./dialog";
import { devtools, persist } from "zustand/middleware";
import {
  PublicHolidaysSlice,
  createPublicHolidaysSlice,
} from "./publicHolidays";
import { SnackbarSlice, createSnackbarSlice } from "./snackbar";

export type StoreState = DateSlice &
  EventsSlice &
  DialogSlice &
  PublicHolidaysSlice &
  SnackbarSlice;

export type StoreMiddleware = [
  ["zustand/persist", unknown],
  ["zustand/devtools", unknown]
];

export const useBoundStore = create<StoreState, StoreMiddleware>(
  persist(
    devtools((...a) => ({
      ...createDateSlice(...a),
      ...createEventsSlice(...a),
      ...createDialogSlice(...a),
      ...createPublicHolidaysSlice(...a),
      ...createSnackbarSlice(...a),
    })),
    { name: "planner-store" }
  )
);
