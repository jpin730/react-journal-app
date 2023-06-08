import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";

import {
  addNewEmptyNote,
  deleteNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { firestoreDB } from "../../firebase";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "New Note",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    const newDoc = doc(collection(firestoreDB, uid));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error("User UID doesn't exist");

    const notes = await loadNotes(uid);

    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const { id, ...noteToUpdate } = note;

    const docRef = doc(firestoreDB, `${uid}/${id}`);
    await setDoc(docRef, noteToUpdate, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const {
      active: { id },
    } = getState().journal;

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file, uid, id));
    }

    const photosUrls = await Promise.all(fileUploadPromises);

    dispatch(setPhotosToActiveNote(photosUrls));
    dispatch(startSaveNote());
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const {
      active: { id },
    } = getState().journal;

    const memoRef = doc(collection(firestoreDB, `deleted`), id);
    await setDoc(memoRef, { uid });

    const docRef = doc(firestoreDB, `${uid}/${id}`);
    await deleteDoc(docRef);

    dispatch(deleteNote(id));
  };
};
