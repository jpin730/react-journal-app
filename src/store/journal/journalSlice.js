import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    deleteNote: (state, action) => {},
    setActiveNote: (state, action) => {
      state.active = action.payload;
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state, action) => {},
    updateNote: (state, action) => {},
  },
});

export const {
  addNewEmptyNote,
  deleteNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} = journalSlice.actions;
