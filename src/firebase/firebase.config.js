import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAAqc3jngw0QmUpHzXffDpkrI0SheM97mU",
  authDomain: "library-system-398c6.firebaseapp.com",
  projectId: "library-system-398c6",
  storageBucket: "library-system-398c6.appspot.com",
  messagingSenderId: "1010701721017",
  appId: "1:1010701721017:web:17a6608a9bf735d3b8ea68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
