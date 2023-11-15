import React, { useState, useEffect } from 'react';
import {
  Heading,
  Box,
} from "@chakra-ui/react";
import { fetchMediaData } from '../api';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from './Card';



export default function PopularMovies() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    // Use localStorage to check for and retrieve cached movie data
    const cachedMovieData = localStorage.getItem("popularMovieData");
    if (cachedMovieData) {
      setMovieData(JSON.parse(cachedMovieData));
    }

    // Fetch and cache movie data if not found in localStorage
    async function fetchData() {
      try {
        if (!cachedMovieData) {
          const data = await fetchMediaData('popularMovies');
          localStorage.setItem("popularMovieData", JSON.stringify(data));
          setMovieData(data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData();
  }, []);

  const isMobile = window.innerWidth <= 968;
  const perPage = isMobile ? 3 : 6; 

  return (
    <Box px={8} maxWidth="100%">
  <Heading size="md" pb={4}>What is Popular</Heading>
  <Splide  style={{ maxWidth: '100%', overflow: 'hidden' }}
    options={{
      perPage,
      arrows: false,
      pagination: false,
      drag: 'free',
      gap: '1em',
    }}
  >
    {movieData ? (
      movieData.map((movie) => (
        <SplideSlide key={movie.id}>
          <Card
            imageSrc={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            title={movie.title}
            releaseDate={movie.release_date}
            ratings={movie.vote_average}
            link={`movie/${movie.id}`}
          />
        </SplideSlide>
      ))
    ) : (
      <p>Loading movie data...</p>
    )}
  </Splide>
</Box>
  );
}
