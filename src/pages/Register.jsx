import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate, Link} from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut, updateProfile
} from 'firebase/auth';
import { addUserToFirestore } from '../services/firebase';
import { Input, Button, Box, Text } from '@chakra-ui/react';
import FullScreenSection from '../components/FullScreenSection';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(auth.currentUser, {
      //   displayName: 
      // })
      const userId = auth.currentUser.uid;
      console.log("user id from register", userId);
      // Add user to Firestore with initial data
      await addUserToFirestore(userId)
      console.log(userId, 'signed up and added to Firestore');
      navigate('/login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);

      // Provide user-friendly error messages
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const userId = auth.currentUser.uid;
      // Add user to Firestore with initial data
      await addUserToFirestore(userId)
      console.log(userId, 'signed up and added to Firestore');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);

      // Provide user-friendly error messages
      if (errorCode === 'auth/popup-closed-by-user') {
        alert('Google authentication popup closed by the user.');
      } else {
        alert(errorMessage);
      }
    }
  };


  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <FullScreenSection
      isDarkBackground
      justifyContent="center"
      alignItems="start"
      maxWidth="100%"
      position="relative"
      spacing={4}
      p={8}
    >
      <form>
        <Input
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={signIn} colorScheme="teal">
          Sign Up
        </Button>
      </form>
      <Box mt={4}>
        <Button
          onClick={signInWithGoogle}
          colorScheme="blue"
        >
          Sign In With Google
        </Button>
        <Text mt={2} color="gray.500" textAlign="center">
          Google sign-in may be blocked by popup blockers. Please ensure they are disabled.
        </Text>
      </Box>
      <Text>
          Already have an account? {""}
            <Link to="/login" >
                Login
            </Link>
        </Text>
    </FullScreenSection>
  );
}
