import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDzMt18VPMmXIBoYJi8FAwriKmnG5-aFTI",
  authDomain: "niah-db.firebaseapp.com",
  projectId: "niah-db",
  storageBucket: "niah-db.appspot.com",
  messagingSenderId: "708173163227",
  appId: "1:708173163227:web:204a5dca0194feef9cfafe",
  measurementId: "G-VGJHXTDMLM"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
