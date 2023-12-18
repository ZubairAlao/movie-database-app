import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { useNavigate, Link, Form} from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut, updateProfile
} from 'firebase/auth';
import { addUserToFirestore } from '../services/firebase';
import { Input, Button, Box, Text,  Center, useColorMode } from '@chakra-ui/react';
import FullScreenSection from '../components/FullScreenSection';


export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setSignInError(null);
    setIsLoading(true); // Corrected from isLoading=(true)
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userId = auth.currentUser.uid;
      console.log("user id from register", userId);
      await addUserToFirestore(userId);
      console.log(userId, 'signed up and added to Firestore');
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
  
      if (errorCode === 'auth/email-already-in-use') {
        setSignInError('Email Already in Use');
      } else if (errorCode === 'auth/invalid-email') {
        setSignInError("Invalid Email");
      } else if (errorCode === 'auth/weak-password') {
        setSignInError("The password is too weak.");
      } else if (errorCode === "auth/network-request-failed") {
        setSignInError("Network Error, check internet connection");
      } else if (errorCode === "auth/too-many-requests") {
        setSignInError("Access to this account has been temporarily disabled due to many failed Sign In attempts. Try again later");
      } else {
        setSignInError("An error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false);
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
        setSignInError('Google authentication popup closed by the user.')
      } else {
        setSignInError("An error occurred. Please try again.")
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
      alignItems="center"
      maxWidth="100%"
      position="relative"
      spacing={4}
      p={8}
    >
      <Text fontSize="1.5rem">Sign Up to your account</Text>
      {signInError && <Text color="red">{signInError}</Text>}
      <Form
        method="post"
        replace
      >
        <Input
          placeholder="Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          mb={4}
        />
        <Input
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          mb={4}
        />

        <Center>
          <Button onClick={signIn}
            isLoading={isLoading}
            bg={colorMode === "light" ? "#1E1E1E" : "#FFFFFF"}
            color={colorMode === "light" ? "#FFFFFF" : "#1E1E1E"}
            _hover={{
              bg: colorMode === "light" ? "#2E2E2E" : "#DDDDDD", // Change the background color on hover
              color: colorMode === "light" ? "#FFFFFF" : "#1E1E1E", // Change the text color on hover
            }}
          >
            Sign Up
          </Button>
        </Center>
      </Form>
      <Box mt={4} >
        <Center>
          <Button
            onClick={signInWithGoogle}
            bg={colorMode === "light" ? "#1E1E1E" : "#FFFFFF"}
            color={colorMode === "light" ? "#FFFFFF" : "#1E1E1E"}
            mb={4}
            _hover={{
              bg: colorMode === "light" ? "#2E2E2E" : "#DDDDDD", // Change the background color on hover
              color: colorMode === "light" ? "#FFFFFF" : "#1E1E1E", // Change the text color on hover
            }}
          >
            Sign In With Google
          </Button>
        </Center>
        <Text mt={2} color={colorMode === "light" ? "#1E1E1E" : "#FFFFFF"} textAlign="center">
          Google sign-in may be blocked by popup blockers. Please ensure they are disabled.
        </Text>
      </Box>
      <Text>
          Already have an account? {""}
            <Link style={{ textDecoration: 'underline' }} to="/login">
                Login
            </Link>
        </Text>
    </FullScreenSection>
  );
}
