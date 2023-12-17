// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, collection, addDoc, deleteDoc, setDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDZTCQ0RQG6CfpRcwMtjoi6Zw1mGKioaoY",
  authDomain: "movie-database-app-8bc77.firebaseapp.com",
  projectId: "movie-database-app-8bc77",
  storageBucket: "movie-database-app-8bc77.appspot.com",
  messagingSenderId: "900898390690",
  appId: "1:900898390690:web:c2d6bb7664afb9373ecdfb",
  measurementId: "G-JZ0NVQXYN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);


setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });


  export const addUserToFirestore = async (userId) => {
  try {
    // Reference to the 'users' collection in Firestore
    const usersCollectionRef = collection(db, 'users');
    
    // Create a user document with the provided userId
    await setDoc(doc(usersCollectionRef, userId), {});

    console.log('User added');
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

// Function to update user profile in Firestore
export const updateUserProfile = async (userId, profileData) => {
  try {
    // Reference to the user document
    const userDocRef = doc(db, 'users', userId);

    // Get the user document data
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() || {}; // Handle the case where userDocSnapshot.data() is undefined

    // Update the user document with the modified profile data
    await updateDoc(userDocRef, {
      profile: {
        ...userData.profile,
        ...profileData,
      },
    });

    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};





export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data() || {};

      const profileData = userData.profile || {};
      console.log(profileData);
      return profileData;
    } else {
      console.log('User document does not exist in Firestore.');
    }
  } catch (error) {
    console.error('Error updating user profile in Firestore: ', error);
    throw error;
  }
};

export const addFavoriteMovie = async (userId, movieData) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Get the user document data
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() || {}; // Handle the case where userDocSnapshot.data() is undefined

    // Ensure that favoriteMovies is initialized as an empty array if not present
    const favoriteMovies = userData.favoriteMovies || [];

    const isMovieAlreadyAdded = favoriteMovies.some((movie) => movie.movieId === movieData.movieId);

    if (isMovieAlreadyAdded) {
      console.log('Movie is already in favorites');
      return;
    }

    // Update the user data by adding the new favorite movie
    await setDoc(userDocRef, {
      ...userData,
      favoriteMovies: [...favoriteMovies, movieData],
    });

    console.log('Favorite movie added to Firestore');
  } catch (error) {
    console.error('Error adding favorite movie to Firestore: ', error);
    throw error;
  }
};


export const addFavoriteTVShow = async (userId, tvShowData) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

      // Get the existing user data
      const userData = userDocSnapshot.data() || {};

      const favoriteTvs = userData.favoriteTvs || [];

      const isTvsAlreadyAdded = favoriteTvs.some((movie) => movie.movieId === tvShowData.movieId);


      if (isTvsAlreadyAdded) {
        console.log('Tvs is already in favorites');
        return;
      }
      // Update the user data by adding the new favorite TV show
      await setDoc(userDocRef, {
        ...userData,
        favoriteTvs: [...favoriteTvs, tvShowData],
      });

      console.log('Favorite TV show added to Firestore');
    
  } catch (error) {
    console.error('Error adding favorite TV show to Firestore: ', error);
    throw error;
  }
};

export const getFavoriteMovies = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Get the user document data
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() || {}; // Handle the case where userDocSnapshot.data() is undefined

    // Access the favoriteMovies array from the user data
    const favoriteMovies = userData.favoriteMovies || [];

    console.log('Favorite movies retrieved from Firestore:', favoriteMovies);
    return favoriteMovies
  } catch (error) {
    console.error('Error retrieving favorite movies from Firestore: ', error);
    throw error;
  }
};

export const getFavoriteTvs = async (userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    // Get the user document data
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data() || {}; // Handle the case where userDocSnapshot.data() is undefined

    // Access the favoriteMovies array from the user data
    const favoriteTvs = userData.favoriteTvs || [];

    console.log('Favorite movies retrieved from Firestore:', favoriteTvs);
    return favoriteTvs
  } catch (error) {
    console.error('Error retrieving favorite movies from Firestore: ', error);
    throw error;
  }
};


export const deleteMovie = async (movieId, userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data()

    const favoriteMovies = userData.favoriteMovies || [];

    // Ensure that favoriteMovies is initialized as an empty array if not present
    const updatedFavoriteMovies = favoriteMovies.filter(item => item.movieId !== movieId);

    // Update the user document with the modified favoriteMovies array
    await updateDoc(userDocRef, { favoriteMovies: updatedFavoriteMovies });

    console.log('Movie deleted from favorites in Firestore');
  } catch (error) {
    console.error('Error deleting movie from favorites in Firestore: ', error);
    throw error;
  }
};

export const deleteTvs = async (movieId, userId) => {
  try {
    const userDocRef = doc(db, 'users', userId);

    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data()

    const favoriteTvs = userData.favoriteTvs || [];

    // Ensure that favoriteMovies is initialized as an empty array if not present
    const updatedFavoriteTvs = favoriteTvs.filter(item => item.movieId !== movieId);

    // Update the user document with the modified favoriteMovies array
    await updateDoc(userDocRef, { favoriteTvs: updatedFavoriteTvs });

    console.log('Movie deleted from favorites in Firestore');
  } catch (error) {
    console.error('Error deleting movie from favorites in Firestore: ', error);
    throw error;
  }
};





