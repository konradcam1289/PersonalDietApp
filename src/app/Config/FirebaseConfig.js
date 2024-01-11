import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvlePY6U2lq4r_tg6HEcylyIlZFNA5_sM",
  authDomain: "personaldiet-df7d6.firebaseapp.com",
  projectId: "personaldiet-df7d6",
  storageBucket: "personaldiet-df7d6.appspot.com",
  messagingSenderId: "522898045068",
  appId: "1:522898045068:web:6237f3b95ec73e9a32e3a9"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);