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
    async function fetchData() {
      try {
          const data = await fetchMediaData('trendingMovies', selectedTimePeriod);
          localStorage.setItem("trendingMovieData", JSON.stringify(data));
          setMovieData(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData();
  }, [selectedTimePeriod]);

  const isMobile = window.innerWidth <= 968;
  const perPage = isMobile ? 3 : 6;
  console.log(movieData);


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
          movieData.map((movie) => {
            const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            const formattedFirstAirDate = new Date(movie.first_air_date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
            const percentageScore = Math.round((movie.vote_average/10) * 100)
            return (
              <SplideSlide key={movie.id}>
                <Card
                  imageSrc={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  name={movie.title || movie.name}
                  // name={movie.name}
                  releaseDate={movie.media_type === 'movie' ? formattedReleaseDate : formattedFirstAirDate}
                  ratings={percentageScore + "%"}
                  link={movie.media_type === 'movie' ? `movie/${movie.id}` : `tv/${movie.id}`}
                />
              </SplideSlide>
            );
          })
        ) : (
          <p>Loading movie data...</p>
        )}
      </Splide>
    </Box>
  );
}
