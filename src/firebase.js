import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBAaZ94LNkBiOR0JaMyYxwouHMLyUbdGiU",
  authDomain: "react-shop-e73fa.firebaseapp.com",
  projectId: "react-shop-e73fa",
  storageBucket: "react-shop-e73fa.appspot.com",
  messagingSenderId: "54332342018",
  appId: "1:54332342018:web:3718d01728b64cdf60cc1b"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage()

export { db, auth, storage };