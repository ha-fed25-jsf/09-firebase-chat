// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgcK5a0kkho52RdRaebjgTtMk7aZh1yxA",
  authDomain: "fed25-chat.firebaseapp.com",
  projectId: "fed25-chat",
  storageBucket: "fed25-chat.firebasestorage.app",
  messagingSenderId: "775132237392",
  appId: "1:775132237392:web:97c0f35cffa29aba7acb55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }
