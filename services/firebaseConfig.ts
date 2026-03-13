import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHj8KE1SeQiZ2A7NyrIkPDjJAzOB_1DkM",
  authDomain: "mindbloom-24b0a.firebaseapp.com",
  projectId: "mindbloom-24b0a",
  storageBucket: "mindbloom-24b0a.firebasestorage.app",
  messagingSenderId: "774082288008",
  appId: "1:774082288008:web:826891c0216b426fb6823d",
  measurementId: "G-55XK5L3CK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };
