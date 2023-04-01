import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLhr8zdnBO54eCQ35GuK6wfd-YiKg5ltE",
  authDomain: "chatgpt-2-40caf.firebaseapp.com",
  projectId: "chatgpt-2-40caf",
  storageBucket: "chatgpt-2-40caf.appspot.com",
  messagingSenderId: "328801923424",
  appId: "1:328801923424:web:1309540ebf75046aa32e05",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
