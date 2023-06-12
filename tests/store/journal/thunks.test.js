import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";

import { firestoreDB } from "../../../src/firebase";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
} from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

// TO RUN THESE TESTS:
// DISABLE READ/WRITE PERMISSIONS IN FIRESTORE

describe("journal/thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should create a new blank note", async () => {
    const newNote = {
      title: "New Note",
      body: "",
      date: expect.any(Number),
      imageUrls: expect.any(Array),
      id: expect.any(String),
    };

    const uid = "test-uid";
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote));
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));

    const collectionRef = collection(firestoreDB, uid);
    const docs = await getDocs(collectionRef);
    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });
});
