import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import { fetchMedia } from '../../api';
import FullScreenSection from '../../components/FullScreenSection';
import { Text, Image, Stack, VStack, Button } from "@chakra-ui/react";

export function loader({ params }) {
  return fetchMedia('person', params.id);
}

export default function PopularPeopleDetails() {
  const person = useLoaderData();
  console.log(person);
  const [showFullBio, setShowFullBio] = useState(false);

  const formattedBirthday = new Date(person.birthday).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const toggleBioVisibility = () => {
    setShowFullBio(!showFullBio);
  };

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
      <Link to='..' relative="path">&larr; <span>Back to People</span></Link>
      <Stack spacing={8} align="flex-start" flexDirection={{base: "column", md:"row" }}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
          alt={person.name}
          boxSize="200px"
          objectFit="cover"
          borderRadius="md"
        />
        <VStack align="start">
          <Text fontSize="2xl" fontWeight="bold">{person.name}</Text>
          <Text fontSize="md">Birthday: {formattedBirthday}</Text>
          <Text fontSize="md">Place of Birth: {person.place_of_birth}</Text>
          <Text fontSize="md">Popularity: {person.popularity}</Text>
          <Text fontSize="md" mt={4}>
            {showFullBio ? person.biography : `${person.biography.slice(0, 200)}...`}
            {!showFullBio && (
              <Button colorScheme="teal" size="sm" onClick={toggleBioVisibility} mt={4}>
                Read More
              </Button>
            )}
          </Text>
          {showFullBio && (
            <Button colorScheme="red" size="sm" onClick={toggleBioVisibility} mt={2}>
              Read Less
            </Button>
          )}
          <Text fontSize="md" mt={2}>Also Known As:</Text>
          <VStack align="start" spacing={1}>
            {person.also_known_as.map((name, index) => (
              <Text key={index} fontSize="sm">{name}</Text>
            ))}
          </VStack>
        </VStack>
      </Stack>
    </FullScreenSection>
  );
}
