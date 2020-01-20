import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAW6bQICqjqyP9bUJVwQMI0HoGGqTxxQRk",
  authDomain: "cs394-learn-react-tommypraeger.firebaseapp.com",
  databaseURL: "https://cs394-learn-react-tommypraeger.firebaseio.com",
  projectId: "cs394-learn-react-tommypraeger",
  storageBucket: "cs394-learn-react-tommypraeger.appspot.com",
  messagingSenderId: "1085427546306",
  appId: "1:1085427546306:web:d76eb783956990ca43235b"  
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export { db };
