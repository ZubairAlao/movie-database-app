import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Flex 
} from "@chakra-ui/react";
import FullScreenSection from '../components/FullScreenSection';
import { fetchMediaData } from '../api';
import TrendingMovies from '../components/TrendingMovies';
import PopularMovies from '../components/PopularMovies';


export default function LandingPage() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    // Use localStorage to check for and retrieve cached movie data
    const cachedMovieData = localStorage.getItem("movieData");
    if (cachedMovieData) {
      setMovieData(JSON.parse(cachedMovieData));
    }

    // Fetch and cache movie data if not found in localStorage
    async function fetchData() {
      try {
        if (!cachedMovieData) {
          const data = await fetchMediaData('popularMovies');
          localStorage.setItem("movieData", JSON.stringify(data));
          setMovieData(data);
          console.log(movieData);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <FullScreenSection
      isDarkBackground
      justifyContent="start"
      alignItems="start"
      maxWidth="100%"
      position="relative"
      spacing={8}
      pb={8}
    >
      <Flex
        flexWrap="wrap"
        minHeight="60%"
        justifyContent="start"
      >
        {movieData ? (
          movieData.results.slice(0, 3).map(movie => (
            <Box
              key={movie.id}
              style={{ flex: '0 0 33.33%', marginRight: '0', padding: 0 }}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                  alt={movie.title}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <p>No poster available</p>
              )}
            </Box>
          ))
        ) : (
          <p>Loading movie data...</p>
        )}
      </Flex>

      <TrendingMovies />
      <PopularMovies />

    </FullScreenSection>
  );
}
