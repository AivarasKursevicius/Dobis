import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const authentication = getAuth(app);

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authentication, provider)
    .then((res) => {
      console.log(res);
    })
    .catch((er) => console.log(er));
};

export const signOutWithGoogle = () => {
  signOut(authentication)
    .then(() => {})
    .catch((error) => {
      // An error happened.
    });
};

export const User = onAuthStateChanged(authentication, (user) => {
  console.log("user", user);
});
