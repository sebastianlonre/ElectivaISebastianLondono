import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider} from "firebase/auth";
import { FirebaseAuth, FirebaseStorage, FirebaseDB  } from "./connectionFireBase";
import { getFirestore, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'


export const signInwithGoogle = async () => {
  GoogleProvider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
    const { uid, photoURL, displayName, email } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const registerUser = async ({ email, password, displayName, bio }) => {
  try {
    const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

    await updateProfile(FirebaseAuth.currentUser, { displayName });

    const { uid, photoURL } = result.user;

    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    await setDoc(userRef, {
      uid,
      displayName,
      email,
      photoURL,
      bio: bio || '', 
      createdAt: new Date().toISOString(),
    });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
      bio: bio || '', 
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const logoutUser = async () => {
  return await FirebaseAuth.signOut();
};

export const signInUser = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return {
      ok: false,
      errorMessage: error.message
    };
  }
};

export const updateUser = async (uid, updatedUserData) => {
  try {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);

    await setDoc(userRef, updatedUserData, { merge: true }); 

    return {
      ok: true,
      message: 'Perfil actualizado correctamente'
    };
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    return {
      ok: false,
      errorMessage: 'Error al actualizar el perfil'
    };
  }
};
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