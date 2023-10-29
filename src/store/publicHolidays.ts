import type {} from "@redux-devtools/extension"; // required for devtools typing
import { StateCreator } from "zustand";
import { StoreMiddleware } from "./store";

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[] | null;
}

export interface PublicHolidaysSlice {
  holidays: Record<string, Holiday[]>;
  fetchPublicHolidays: (year: string) => Promise<void>;
}

export const createPublicHolidaysSlice: StateCreator<
  PublicHolidaysSlice,
  StoreMiddleware,
  []
> = (set, get) => ({
  holidays: {},
  fetchPublicHolidays: async (year: string) => {
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/publicholidays/${year}/TR`
      );
      if (response.ok) {
        const res = await response.json();
        set(
          { holidays: { ...get().holidays, [year]: res } },
          false,
          "holidays/fetchPublicHolidays"
        );
      } else {
        // Handle the error as needed
      }
    } catch (error) {
      // Handle network errors
    }
  },
});
