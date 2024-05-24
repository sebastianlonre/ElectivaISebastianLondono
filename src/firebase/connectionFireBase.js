import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC2Q0K5JWfH720gRDY1w1hi_payQZ3S0CE",
  authDomain: "niah-your-shop.firebaseapp.com",
  projectId: "niah-your-shop",
  storageBucket: "niah-your-shop.appspot.com",
  messagingSenderId: "751176981824",
  appId: "1:751176981824:web:f560cd6f95dd554c6c2ea5"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
