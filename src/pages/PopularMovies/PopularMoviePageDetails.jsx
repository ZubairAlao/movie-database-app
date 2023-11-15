import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchMedia } from '../../api';
import FullScreenSection from '../../components/FullScreenSection';
import { Stack, Text, Image, VStack, Badge } from "@chakra-ui/react";

export function loader({ params }) {
  return fetchMedia("movie", params.id);
}

export default function PopularMoviePageDetails() {
  const movie = useLoaderData();
  const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  const formattedRuntime = `${hours}hr ${minutes}min`;

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
      <Link to='..' relative="path">
        &larr; <span>Back to Movies</span>
      </Link>
      <Stack spacing={4} flexDirection={{base: "column", md:"row" }}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          minW="200px"
        />
        <VStack align="start">
          <Text fontSize="xl">{movie.title}</Text>
          <Badge colorScheme="teal">{formattedReleaseDate}</Badge>
          <Text>Ratings: {Math.round((movie.vote_average / 10) * 100) + '%'}</Text>
          <Text fontSize="md">Genres: {movie.genres.map((genre) => genre.name).join(', ')}</Text>
          <Text>{formattedRuntime}</Text>
          <Text fontSize="md">Overview: {movie.overview}</Text>
        </VStack>
      </Stack>
    </FullScreenSection>
  );
}
