import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  GoogleAuthProvider,
  updatePassword} from "firebase/auth";
import { FirebaseAuth  } from "./connectionFireBase";
import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';

const GoogleProvider = new GoogleAuthProvider();

export const signInwithGoogle = async () => {
  GoogleProvider.setCustomParameters({ prompt: 'select_account' });

  try {
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider);
    const { uid, photoURL, displayName, email } = result.user;

    
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userSnapshot = await getDoc(userRef);

    
    if (!userSnapshot.exists()) {
      await setDoc(userRef, {
        uid,
        photoURL,
        displayName,
        email,
        bio: '', 
        createdAt: new Date().toISOString(),
      });
    }

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    };
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
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
      
      
      photoURL,
      bio: bio || '', 
      createdAt: new Date().toISOString(),
    });

    return {
      ok: true,
      uid,
      photoURL,
      
      
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
    const { password, displayName, ...userData } = updatedUserData;

    if (password) {
      await updatePassword(FirebaseAuth.currentUser, password);
    }

    if (displayName) {
      await updateProfile(FirebaseAuth.currentUser, { displayName });
    }

    userData.updatedAt = new Date().toISOString();

    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, userData);

    return { ok: true, message: 'Perfil actualizado correctamente' };
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    return { ok: false, errorMessage: 'Error al actualizar el perfil' };
  }
};

  
export const updateUserDisplayName = async (displayName) => {
  try {
    await updateProfile(FirebaseAuth.currentUser, { displayName });
    return { ok: true, message: 'Nombre de usuario actualizado correctamente' };
  } catch (error) {
    console.error('Error al actualizar el nombre de usuario:', error);
    return { ok: false, errorMessage: 'Error al actualizar el nombre de usuario' };
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




