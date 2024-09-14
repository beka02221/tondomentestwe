import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkxOMXo8z9gmozoDM1-hJ7rI-KoubWN8k",
  authDomain: "eclipse1-c188d.firebaseapp.com",
  projectId: "eclipse1-c188d",
  storageBucket: "eclipse1-c188d.appspot.com",
  messagingSenderId: "193754748031",
  appId: "1:193754748031:web:fce9b611a62fa8fbd69b4a",
  measurementId: "G-PF5RVDX4W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };
