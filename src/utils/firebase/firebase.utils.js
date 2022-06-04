import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDQ6-X_qVKQeznSC1A2wDAnZ3OeiLfppqE",
  authDomain: "crwn-clothing-db-9c4a2.firebaseapp.com",
  projectId: "crwn-clothing-db-9c4a2",
  storageBucket: "crwn-clothing-db-9c4a2.appspot.com",
  messagingSenderId: "376570919679",
  appId: "1:376570919679:web:ca554899960bdb28e9eaca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSpanshot = await getDoc(userDocRef);
  console.log('userSpanshot', userSpanshot);
  console.log('userSpanshot', userSpanshot.exists());


  if (!userSpanshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }
  return userDocRef;
}