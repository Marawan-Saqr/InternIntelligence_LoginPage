import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// My Firebase Configurations
const firebaseConfig = {
  apiKey: "AIzaSyBxUCxDqg7-A0Gf4i6dH26sRD5F8-pjB-I",
  authDomain: "internintelligence-loginpage.firebaseapp.com",
  projectId: "internintelligence-loginpage",
  storageBucket: "internintelligence-loginpage.firebasestorage.app",
  messagingSenderId: "315679995579",
  appId: "1:315679995579:web:7f759aefa19710b2a1db9e",
  measurementId: "G-TG092WMNCB"
};


const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export default app;