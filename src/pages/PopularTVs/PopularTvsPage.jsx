import {
  Heading,
  Box,
  Center,
  Select
} from "@chakra-ui/react";
import React from 'react';
import { fetchMediaData } from '../../api';
import FullScreenSection from '../../components/FullScreenSection';
import Card from '../../components/Card';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Await, defer, useLoaderData, Link } from 'react-router-dom';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { addFavoriteTVShow, auth, getFavoriteTvs, deleteTvs } from "../../services/firebase";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export function loader(sortOrder) {
    return defer({ movies: fetchMediaData('popularTvs', sortOrder) });
}

export default function PopularTvsPage() {
    const dataPromise = useLoaderData();
    const [sortOrder, setSortOrder] = React.useState('desc');
    const [tvList, setTvList] = React.useState(null);
    const userId = auth.currentUser?.uid;

    const fetchFavoriteTvs = async () => {
        try {
            const favoriteTvs = await getFavoriteTvs(userId);
            setTvList(favoriteTvs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchFavoriteTvs();
      }, [userId]);


    function renderPopularMoviesElements(movies) {
        const popularMoviesElements = movies.map(movie => {
            const formattedReleaseDate = new Date(movie.first_air_date).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });
            const percentageScore = Math.round((movie.vote_average / 10) * 100);
            
            const tvShowData = {
                movieId: movie.id,
                title: movie.name,
                releaseDate: movie.first_air_date,
                imgSrc: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                rating: movie.vote_average,
            };

            const handleToggleFavoriteTvs = async () => {
                if (
                  tvList &&
                  tvList.some((favMovie) => favMovie.movieId === movie.id)
                ) {
                  // Movie is in favorites, delete it
                   await deleteTvs(movie.id, userId);
                   fetchFavoriteTvs();
                } else {
                  // Movie is not in favorites, add it
                  await addFavoriteTVShow(userId, tvShowData);
                  fetchFavoriteTvs();
                }
              };

            return (
                <Box position="relative" key={movie.id}>
                    <Card
                        key={movie.id}
                        imageSrc={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        name={movie.name}
                        releaseDate={formattedReleaseDate}
                        ratings={percentageScore + "%"}
                        link={{
                            pathname: `${movie.id}`,
                            state: { sort: sortOrder },
                        }}
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
                                <MenuItem onClick={handleToggleFavoriteTvs}>
                                    {tvList &&
                                    tvList.some((favMovie) => favMovie.movieId === movie.id)
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
                <Heading size="md" pb={4}>Popular TVs</Heading>
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
