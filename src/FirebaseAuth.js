import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Message, Button } from 'rbx';

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
  NavBar
};
