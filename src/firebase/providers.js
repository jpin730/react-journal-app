import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const {
      user: { displayName, email, photoURL, uid },
    } = await signInWithPopup(firebaseAuth, googleProvider);

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    const {
      user: { photoURL, uid },
    } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await updateProfile(firebaseAuth.currentUser, { displayName });
    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  try {
    const {
      user: { displayName, photoURL, uid },
    } = await signInWithEmailAndPassword(firebaseAuth, email, password);

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

export const logoutFirebase = async () => {
  return await firebaseAuth.signOut();
};
