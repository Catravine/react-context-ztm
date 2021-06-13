import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC930GgAGZ9KDhh0BdUJIPerOJkjzEG55s",
  authDomain: "crown-clothing-90983.firebaseapp.com",
  databaseURL: "https://crown-clothing-90983-default-rtdb.firebaseio.com",
  projectId: "crown-clothing-90983",
  storageBucket: "crown-clothing-90983.appspot.com",
  messagingSenderId: "821705780681",
  appId: "1:821705780681:web:3e3ef3a64a187991bb4c18",
  measurementId: "G-JSDFKD7SNH"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
