import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const {
      user: { displayName, email, photoURL, uid },
    } = await signInWithPopup(firebaseAuth, googleProvider);

    return { ok: true, displayName, email, photoURL, uid };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};
