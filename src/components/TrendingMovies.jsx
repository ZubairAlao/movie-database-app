import React, { useState, useEffect } from 'react';
import {
  Heading,
  HStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { fetchMediaData } from '../api';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import Card from './Card';


export default function TrendingMovies() {
  const [movieData, setMovieData] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('week');

  useEffect(() => {
    // Use localStorage to check for and retrieve cached movie data
    const cachedMovieData = localStorage.getItem("trendingMovieData");
    if (cachedMovieData) {
      setMovieData(JSON.parse(cachedMovieData));
      console.log(movieData);
    }

    // Fetch and cache movie data if not found in localStorage
    async function fetchData() {
      try {
        if (!cachedMovieData) {
          const data = await fetchMediaData('trendingMovies', selectedTimePeriod);
          localStorage.setItem("trendingMovieData", JSON.stringify(data));
          setMovieData(data);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData();
  }, [selectedTimePeriod]);

  const isMobile = window.innerWidth <= 968;
  const perPage = isMobile ? 3 : 6;


  return (
    <Box px={8} maxWidth="100%">
    <HStack>
      <Heading size="md">Trending</Heading>
      <HStack p={4} borderRadius="lg">
        <Button
          bg={selectedTimePeriod === 'day' ? "blue.500" : "transparent"}
          onClick={() => setSelectedTimePeriod('day')}
        >
          Today
        </Button>
        <Button
          bg={selectedTimePeriod === 'week' ? "blue.500" : "transparent"}
          onClick={() => setSelectedTimePeriod('week')}
        >
          This Week
        </Button>
      </HStack>
      </HStack>
      <Splide style={{ maxWidth: '100%', overflow: 'hidden' }}
        options={{
          perPage,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '1em',
        }}
      >
        {movieData ? (
          movieData.results.map((movie) => (
            <SplideSlide key={movie.id}>
              <Card
                imageSrc={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                title={movie.title}
                name={movie.name}
                releaseDate={movie.release_date}
                FirstAirDate={movie.first_air_date}
                ratings={movie.vote_average}
                link={movie.media_type === 'movie' ? `movie/${movie.id}` : `tv/${movie.id}`}
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
