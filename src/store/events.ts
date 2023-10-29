import { StateCreator } from "zustand";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { StoreMiddleware } from "./store";

export interface EventData {
  id: string;
  starts: string;
  ends: string;
  title: string;
  description?: string;
}

export interface EventsSlice {
  events: EventData[];
  addEvent: (event: EventData) => void;
  removeEvent: (eventId: string) => void;
  editEvent: (event: EventData) => void;
}

export const createEventsSlice: StateCreator<EventsSlice, StoreMiddleware> = (
  set,
  get
) => ({
  events: [],
  addEvent: (event) =>
    set(
      (state) => ({
        events: [...state.events, event],
      }),
      false,
      "events/add"
    ),
  removeEvent: (eventId) =>
    set(
      (state) => ({
        events: state.events.filter((event) => event.id !== eventId),
      }),
      false,
      "events/remove"
    ),
  editEvent: (event) =>
    set(
      (state) => {
        const indexToUpdate = state.events.findIndex(
          (item) => item.id === event.id
        );
        if (indexToUpdate !== -1) {
          const updatedEvents = [...state.events];
          updatedEvents[indexToUpdate] = event;

          return { ...state, events: updatedEvents };
        }
        return state;
      },
      true,
      "events/edit"
    ),
});
