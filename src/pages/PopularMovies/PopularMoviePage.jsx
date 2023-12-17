import {
  Heading,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import React from 'react';
import { fetchMediaData } from "../../api";
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Await, defer, useLoaderData, Link } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { addFavoriteMovie, auth } from "../../services/firebase";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { getFavoriteMovies } from "../../services/firebase";
import { deleteMovie } from "../../services/firebase";


export function loader() {
    return defer({ movies: fetchMediaData('popularMovies') });
}

export default function PopularMoviesPage() {
    const dataPromise = useLoaderData();
    // console.log(dataPromise.movies);
    const [movieList, setMovieList] = React.useState(null);
    const userId = auth.currentUser?.uid;

    const fetchFavoriteMovies = async () => {
        try {
            const favoriteMovies = await getFavoriteMovies(userId);
            setMovieList(favoriteMovies);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchFavoriteMovies();
      }, [userId]);

    //   console.log(movieList);
    

    function renderPopularMoviesElements(movies) {
        const popularMoviesElements = movies.map(movie => {
            const formattedReleaseDate = new Date(movie.release_date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

            const percentageScore = Math.round((movie.vote_average/10) * 100)

            const movieData = {
                movieId: movie.id,
                title: movie.title,
                releaseDate: movie.release_date,
                imgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: movie.vote_average,
            };

            const handleToggleFavoriteMovie = async () => {
                if (
                  movieList &&
                  movieList.some((favMovie) => favMovie.movieId === movie.id)
                ) {
                  // Movie is in favorites, delete it
                   await deleteMovie(movie.id, userId);
                   fetchFavoriteMovies();
                } else {
                  // Movie is not in favorites, add it
                  await addFavoriteMovie(userId, movieData);
                  fetchFavoriteMovies();
                }
              };
  
          return (
            <Box position="relative" key={movie.id}>
                <Card
                  key={movie.id}
                  imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  name={movie.title}
                  releaseDate={formattedReleaseDate}
                  ratings={percentageScore + "%"}
                  link={`${movie.id}`}
                />
                {/* FontAwesome icon for the three dots */}
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
                            {auth.currentUser ? (
                            <MenuItem onClick={handleToggleFavoriteMovie}>
                                {movieList &&
                                movieList.some((favMovie) => favMovie.movieId === movie.id)
                                ? 'Delete Favorite'
                                : 'Add Favorite'}
                            </MenuItem>
                            ) : (
                            <MenuItem>
                                <Link to="/login">Login</Link>
                            </MenuItem>
                            )}
                        </MenuList>
                    </Menu>
                </Box>
            </Box>
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
            <Box>
                <Heading size="md" pb={4}>Popular Movies</Heading>
                <Menu>
                    <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                        Sort
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Popularity Ascending</MenuItem>
                        <MenuItem>Popularity Descending</MenuItem>
                        <MenuItem>Rating Ascending</MenuItem>
                        <MenuItem>Rating Descending</MenuItem>
                    </MenuList>
                </Menu>
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
