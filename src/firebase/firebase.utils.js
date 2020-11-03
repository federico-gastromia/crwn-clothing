import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCf1UkxVDJlEWIRjwkc1fEoQd-2MYanjU8",
  authDomain: "crwn-db-2a4d0.firebaseapp.com",
  databaseURL: "https://crwn-db-2a4d0.firebaseio.com",
  projectId: "crwn-db-2a4d0",
  storageBucket: "crwn-db-2a4d0.appspot.com",
  messagingSenderId: "388072712958",
  appId: "1:388072712958:web:1c092beca06cd4313e13af",
  measurementId: "G-KHRPJ4SVNQ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
