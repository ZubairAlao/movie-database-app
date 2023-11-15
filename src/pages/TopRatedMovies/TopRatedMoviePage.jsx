import { 
  Heading, 
  Box,
  Center,
  Select,
} from "@chakra-ui/react";
import React from 'react';
import { fetchMediaData } from '../../api';
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Await, defer, useLoaderData } from 'react-router-dom';

export function loader() {
  return defer({ movies: fetchMediaData('topRatedMovies') });
}

export default function TopRatedMoviePage() {
    const dataPromise = useLoaderData();
    console.log(dataPromise.movies);
    const [sortOrder, setSortOrder] = React.useState('desc');
    console.log(sortOrder);

    function renderPopularMoviesElements(movies) {
        const popularMoviesElements = movies.map(movie => {
            const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
  
            const percentageScore = Math.round((movie.vote_average/10) * 100)
      
            return (
              <Card
                key={movie.id}
                imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                releaseDate={formattedReleaseDate}
                ratings={percentageScore + "%"}
                link={`${movie.id}`}
              />
            );
          });
        return (
            <section>
               <Box display="grid"
                 gridTemplateColumns={{base: "1fr", sm: "repeat(2,minmax(0,1fr))", md: "repeat(4,minmax(0,1fr))",  lg: "repeat(5,minmax(0,1fr))"}}
                gridGap={8} mt={8}>
                    {popularMoviesElements}
                </Box>
            </section>
        )
    }

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
            <Box p={8}>
                <Heading size="md" pb={4}>Top Rated Movies</Heading>
                <Select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} mb={4}>
                    <option value="desc">Popularity Descending</option>
                    <option value="asc">Popularity Ascending</option>
                </Select>
                <React.Suspense fallback={
                    <Center h="50vh">
                        <FontAwesomeIcon icon={faSpinner} size="7x" />
                    </Center>
                }>
                    <Await resolve={dataPromise.movies}>
                        {renderPopularMoviesElements}
                    </Await>
                </React.Suspense>
            </Box>
        </FullScreenSection>
    );
}
