import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdAhxUlMjP70RhW-z-rdu4Eqz7JJ7Bn1E",
  authDomain: "niah--shop-7f48e.firebaseapp.com",
  projectId: "niah--shop-7f48e",
  storageBucket: "niah--shop-7f48e.appspot.com",
  messagingSenderId: "62129911906",
  appId: "1:62129911906:web:5419c15e8628af9de2393b"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
