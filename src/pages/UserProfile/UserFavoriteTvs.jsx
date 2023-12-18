import React, { useState, useEffect } from 'react';
import { auth, deleteTvs } from '../../services/firebase';
import { Box, Text, } from '@chakra-ui/react';
import FullScreenSection from '../../components/FullScreenSection'
import Card from '../../components/Card';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getFavoriteTvs } from '../../services/firebase';

export default function UserFavoriteTvs() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [tvList, setTvList] = useState(null);
  const userId = auth.currentUser?.uid; // Using optional chaining for safety

  const fetchFavoriteTvs = async () => {
    try {
      const favoriteTvs = await getFavoriteTvs(userId);
      setTvList(favoriteTvs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchFavoriteTvs();
  }, [userId]);

  useEffect(() => {
    if (showAlert) {
    const timeoutId = setTimeout(() => {
        setShowAlert(false);
        setAlertMessage(''); // Clear the message after hiding
    }, 3000);

    // Clear the timeout when the component unmounts or showAlert changes
    return () => clearTimeout(timeoutId);
    }
  }, [showAlert]);

  return (
    <FullScreenSection
      isDarkBackground
      justifyContent="start"
      alignItems="start"
      maxWidth="100%"
      position="relative"
      spacing={4}
      p={8}
    >
        {showAlert && (
        <Box
          style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              // background: 'yellow',
              padding: '20px',
              fontSize: "1.1rem",
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
        {alertMessage}
        </Box>
      )}
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))", lg: "repeat(5, minmax(0, 1fr))" }}
          gap={4}
        >
          {tvList && tvList.length > 0  ? (
            tvList.map((movie, index) => {
              const formattedReleaseDate = new Date(movie.releaseDate).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            const handleDeleteFavoriteTvs = async () => {
              await deleteTvs(movie.movieId, userId);
              fetchFavoriteTvs();
              setAlertMessage('Removed from favorites!');
              setShowAlert(true);
            }

            const percentageScore = Math.round((movie.rating/10) * 100)
            return (
              <Box key={movie.movieId} mb={4} position="relative">
                <Card
                  key={movie.movieId}
                  imageSrc={movie.imgSrc}
                  name={movie.title}
                  releaseDate={formattedReleaseDate}
                  ratings={percentageScore + "%"}
                  link={`/tv/${movie.movieId}`}
                />

                <Box
                  position="absolute"
                  top="3"
                  right="3"
                  p="2"
                  borderRadius="full"
                  bg="gray.300"
                  _hover={{
                  backgroundColor: 'gray.400',
                  }}
                >
                  <Menu>
                      <MenuButton>
                      <FontAwesomeIcon icon={faEllipsisV} size="xs" />
                      </MenuButton>
                      <MenuList>
                      {auth.currentUser ?
                          <MenuItem onClick={handleDeleteFavoriteTvs}>Delete Favorite</MenuItem>
                      : <MenuItem>
                          <Link to="/login">Login</Link>
                          </MenuItem>
                      }
                      </MenuList>
                  </Menu>
                </Box>
              </Box>
            );
            })
          ) : (
            <Text>No Tv Shows yet. <Link style={{ textDecoration: 'underline' }} to="/tv">Discover some Tvs!</Link></Text>
          )}
        </Box>
    </FullScreenSection>
  );
}
