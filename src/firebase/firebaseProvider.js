import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./connectionFireBase";

export const logoutUser = async () => {
  return await FirebaseAuth.signOut();
}

export const signInUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL, displayName} = result.user

    return{
      ok:true,
      displayName,email,photoURL,uid
    }

  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}