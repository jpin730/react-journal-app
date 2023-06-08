import { collection, getDocs } from "firebase/firestore/lite";

import { firestoreDB } from "../firebase";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("User UID doesn't exist");

  const collectionRef = collection(firestoreDB, uid);
  const docs = await getDocs(collectionRef);

  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });

  return notes;
};
