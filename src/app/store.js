import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "../features/slices/notesSlice";
import displaydNoteSlice from "../features/slices/displaydNoteSlice";
import displaydFolderSlice from "../features/slices/displaydFolderSlice";

export const store = configureStore({
  reducer: {
    notes: notesSlice,
    displaydNote: displaydNoteSlice,
    displaydFolder: displaydFolderSlice,
  },
});