import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Message, Button } from 'rbx';

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

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = ({ setCartOpen }) => (
  <Message>
    <Message.Header>
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
      <Button onClick={() => setCartOpen(true)}>
        Show cart
      </Button>
    </Message.Header>
  </Message>
);

const Welcome = ({ user, setCartOpen }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
      <Button onClick={() => setCartOpen(true)}>
        Show cart
      </Button>
    </Message.Header>
  </Message>
);

const NavBar = ({ user, setCartOpen }) => (
  <React.Fragment>
    {user ?
    <Welcome user={user} setCartOpen={setCartOpen} />
    : <SignIn setCartOpen={setCartOpen} />}
  </React.Fragment>
)

export {
  db,
  NavBar
};
