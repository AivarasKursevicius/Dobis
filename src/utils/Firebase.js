import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCaSX_bOzNhs5PqookIW6tr_ddW0DNZvP0",
  authDomain: "personal-aivaras.firebaseapp.com",
  databaseURL:
    "https://personal-aivaras-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "personal-aivaras",
  storageBucket: "personal-aivaras.appspot.com",
  messagingSenderId: "99452362158",
  appId: "1:99452362158:web:23723991a8de3988be7c3f",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
