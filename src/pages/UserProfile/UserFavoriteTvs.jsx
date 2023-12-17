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
                  link={`/tv/${tvShow.movieId}`}
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
            <Link to="/tv"> <Text color='blue'> No Tv Shows yet. Discover some Tvs!</Text></Link>
          )}
        </Box>
    </FullScreenSection>
  );
}