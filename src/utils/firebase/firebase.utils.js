import { initializeApp } from 'firebase/app'
import  { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA14twf3TQX4o53RpWnBSd69s5zEql_p98",
    authDomain: "low-price-db.firebaseapp.com",
    projectId: "low-price-db",
    storageBucket: "low-price-db.appspot.com",
    messagingSenderId: "904327776041",
    appId: "1:904327776041:web:b48028bcfc2c318ff61938"
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef)
  console.log (userSnapshot)
  console.log (userSnapshot.exists())

  //if user data does not exists
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {displayName, email, createdAt});
    } catch (error) {
      console.log('error creating the user', error.messsage)
    }
  }
  return userDocRef
  // if user data  exists

  //return userDocReg
}