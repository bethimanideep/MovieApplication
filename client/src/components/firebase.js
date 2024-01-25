import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC7BtKqbGgAEq1IdAADDC9TgC45tmPsY9M",
  authDomain: "propftxmoviesassignment.firebaseapp.com",
  projectId: "propftxmoviesassignment",
  storageBucket: "propftxmoviesassignment.appspot.com",
  messagingSenderId: "99717093895",
  appId: "1:99717093895:web:63f7746dc5d813e5e2a8a2",
  measurementId: "G-PKMGERSD68",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
