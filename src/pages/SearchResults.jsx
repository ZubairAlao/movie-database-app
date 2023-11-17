import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { fetchSearchedMedia } from '../api';
import {
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import FullScreenSection from '../components/FullScreenSection';
import Card from '../components/Card';
import { useParams } from 'react-router-dom';

export default function SearchResults() {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedTVShows, setSearchedTVShows] = useState([]);
  const [searchedPeople, setSearchedPeople] = useState([]);
  const [activeSection, setActiveSection] = useState('movies');
  let params = useParams();

  useEffect(() => {
    async function fetchData(searchedQuery) {
      try {
        const data = await fetchSearchedMedia(searchedQuery);
        const movies = data.results.filter((item) => item.media_type === 'movie');
        const tvShows = data.results.filter((item) => item.media_type === 'tv');
        const people = data.results.filter((item) => item.media_type === 'person');
        setSearchedMovies(movies);
        setSearchedTVShows(tvShows);
        setSearchedPeople(people);
        console.log(searchedMovies);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    }

    fetchData(params.search);
  }, [params.search]);

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
      <Box px={8} maxWidth="100%">
        <Heading size="md" pb={4}>search result</Heading>
        <Button
          onClick={() => setActiveSection('movies')}
          variant={activeSection === 'movies' ? 'solid' : 'outline'}
          mr={2}
          mb={8}
          
        >
          Movies
        </Button>
        <Button
          onClick={() => setActiveSection('tvShows')}
          variant={activeSection === 'tvShows' ? 'solid' : 'outline'}
          mr={2}
          mb={8}
        >
          TV Shows
        </Button>
        <Button
          onClick={() => setActiveSection('people')}
          variant={activeSection === 'people' ? 'solid' : 'outline'}
          mb={8}
        >
          People
        </Button>
        {activeSection === 'movies' ? (
          searchedMovies.map((movie) => (
              <Card key={movie.id}
                imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                releaseDate={movie.release_date}
                ratings={Math.round((movie.vote_average / 10) * 100) + "%"}
                link={`/movie/${movie.id}`}
              />
          ))
        ) : activeSection === 'tvShows' ? (
          searchedTVShows.map((tvShow) => (
              <Card key={tvShow.id}
                imageSrc={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                title={tvShow.name}
                releaseDate={tvShow.first_air_date}
                ratings={Math.round((tvShow.vote_average / 10) * 100) + "%"}
                link={`/tv/${tvShow.id}`}
              />
          ))
        ) : activeSection === 'people' ? (
          searchedPeople.map((person) => (
              <Card key={person.id}
                imageSrc={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                title={person.name}
                link={`/people/${person.id}`}
              />
          ))
        ) : (
          <p>Loading media data...</p>
        )}
      </Box>
    </FullScreenSection>
  );
}
