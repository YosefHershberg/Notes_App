import React, { useState, useEffect } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import notesSlice from '../features/slices/notesSlice'
import displaydNoteSlice from '../features/slices/displaydNoteSlice';

export const store = configureStore({
  reducer: {
    notes: notesSlice,
    displaydNote: displaydNoteSlice
  },
});
