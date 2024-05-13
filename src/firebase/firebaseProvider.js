import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider} from "firebase/auth";
import { FirebaseAuth, FirebaseStorage } from "./connectionFireBase";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'


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


 export const registerUser = async ({email, password, displayName })=> {

  try {

    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    const { uid, photoURL } = result.user



    return {
      ok: true,
      uid, photoURL, email, displayName

    }

  } catch (error) {
    return{
      ok: false,
      errorMessage: error.message
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

export const uploadImg = async ( img, folder ) => {
  try {

    const storage = getStorage();
    const storageRef = ref(storage, `${folder}/${v4()}`);
    await uploadBytes(storageRef, img);
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error) {
    console.log(error)
  }
}