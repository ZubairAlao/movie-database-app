import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { fetchMedia } from '../../api';
import FullScreenSection from '../../components/FullScreenSection';
import { HStack, Text, Image, Stack, VStack, Badge } from "@chakra-ui/react";

export function loader({ params }) {
  return fetchMedia('tv', params.id);
}

export default function PopularTvsPageDetails() {
  const tvShow = useLoaderData();
  const formattedReleaseDate = new Date(tvShow.first_air_date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const percentageScore = Math.round((tvShow.vote_average / 10) * 100);

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
        &larr; <span>Back to TV Shows</span>
      </Link>
      <Stack spacing={4}
        flexDirection={{base: "column", md:"row" }}
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          alt={tvShow.name}
          minW="200px"
        />
        <VStack align="start">
          <Text fontSize="xl">{tvShow.name}</Text>
          <Badge colorScheme="teal">{formattedReleaseDate}</Badge>
          <Text fontSize="md">Ratings: {percentageScore + "%"}</Text>
          <Text fontSize="md">Genres: {tvShow.genres.map((genre) => genre.name).join(', ')}</Text>
          <HStack>
            <Text>Seasons: {tvShow.number_of_seasons}</Text>
            <Text>Episodes: {tvShow.number_of_episodes}</Text>
          </HStack>
          <Text>{tvShow.overview}</Text>
        </VStack>
      </Stack>
    </FullScreenSection>
  );
}
