import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebaseConfig from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const authentication = getAuth(app);
