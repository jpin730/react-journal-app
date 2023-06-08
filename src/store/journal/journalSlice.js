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
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    clearNotesOnLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    deleteNote: (state, { payload }) => {
      state.active = null;
      state.notes = state.notes.filter(({ id }) => id !== payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = "";
    },
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setPhotosToActiveNote: (state, { payload }) => {
      state.active.imageUrls = [...state.active.imageUrls, ...payload];
      state.isSaving = false;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) =>
        note.id === payload.id ? payload : note
      );
      state.messageSaved = `${payload.title} updated successfully`;
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesOnLogout,
  deleteNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
