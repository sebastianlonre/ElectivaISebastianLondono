import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, GoogleAuthProvider} from "firebase/auth";
import { FirebaseAuth } from "./connectionFireBase";



  const GoogleProvider = new GoogleAuthProvider();

export const signInwithGoogle = async () => {

  GoogleProvider.setCustomParameters({prompt: 'select_account'})


  try {
      const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
      const {uid, photoURL, displayName, email } = result.user
    
      return{
        ok:true,
        displayName,email,photoURL,uid
      }
  } catch (error) {
    console.log(error);
    const errorMessage = error.message

    return{
      ok: false,
      errorMessage
    }
  }

}

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

