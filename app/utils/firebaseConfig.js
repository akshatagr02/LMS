import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA3dUqSDit3Fj6LaYEa-yP11Zkh_KzYQHE",
  authDomain: "librarymanager-c1e8c.firebaseapp.com",
  databaseURL: "https://librarymanager-c1e8c-default-rtdb.firebaseio.com",
  projectId: "librarymanager-c1e8c",
  storageBucket: "librarymanager-c1e8c.firebasestorage.app",
  messagingSenderId: "671641811811",
  appId: "1:671641811811:web:3c371abf9643783830b156",
  measurementId: "G-801H3KD4K8"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export {database}