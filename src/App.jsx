import React, { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react';
import {
   Route,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
 } from "react-router-dom";
import HomePage from './pages/HomePage'
import Layout from "./components/Layout";
import Error from "./components/Error";
import NotFound from "./pages/NotFound";
import PopularMoviesPage, { loader as popularMoviesPageLoader } from "./pages/PopularMovies/PopularMoviePage";
import PopularMoviePageDetails, { loader as popularMoviesDetailsPageLoader } from "./pages/PopularMovies/PopularMoviePageDetails";
import TopRatedMoviePage, { loader as TopRatedMoviePageLoader } from "./pages/TopRatedMovies/TopRatedMoviePage";
import TopRatedMoviePageDetails, { loader as TopRatedMoviePageDetailsLoader } from "./pages/TopRatedMovies/TopRatedMoviePageDetails";
import PopularTvsPage, { loader as PopularTvsPageLoader } from "./pages/PopularTVs/PopularTvsPage";
import PopularTvsPageDetails, { loader as PopularTvsPageDetailsLoader } from "./pages/PopularTVs/PopularTvsPageDetails";
import TopRatedTvsPage, { loader as TopRatedTvsPageLoader } from "./pages/TopRatedTvs/TopRatedTvsPage";
import TopRatedTvsPageDetails, { loader as TopRatedTvsPageDetailsLoader } from "./pages/TopRatedTvs/TopRatedTvsPageDetails";
import PopularPeople, { loader as PopularPeopleLoader } from "./pages/PopularPeople/PopularPeople";
import PopularPeopleDetails, { loader as PopularPeopleDetailsLoader } from "./pages/PopularPeople/PopularPeopleDetails";
import SearchResults from "./pages/SearchResults";


 const router = createBrowserRouter(createRoutesFromElements(
   <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
         path="searched/:search"
         element={<SearchResults />}
         errorElement={<Error />}
      />

      <Route
         path="movie"
         element={<PopularMoviesPage />}
         errorElement={<Error />}
         loader={popularMoviesPageLoader}
      />
      <Route
         path="movie/:id"
         element={<PopularMoviePageDetails />}
         errorElement={<Error />}
         loader={popularMoviesDetailsPageLoader}
      />

      <Route
         path="top-rated-movies"
         element={<TopRatedMoviePage />}
         errorElement={<Error />}
         loader={TopRatedMoviePageLoader}
      />
      <Route
         path="top-rated-movies/:id"
         element={<TopRatedMoviePageDetails />}
         errorElement={<Error />}
         loader={TopRatedMoviePageDetailsLoader}
      />

      <Route
         path="tv"
         element={<PopularTvsPage />}
         errorElement={<Error />}
         loader={PopularTvsPageLoader}
      />
      <Route
         path="tv/:id"
         element={<PopularTvsPageDetails />}
         errorElement={<Error />}
         loader={PopularTvsPageDetailsLoader}
      />

      <Route
         path="top-rated-tvs"
         element={<TopRatedTvsPage />}
         errorElement={<Error />}
         loader={TopRatedTvsPageLoader}
      />
      <Route
         path="top-rated-tvs/:id"
         element={<TopRatedTvsPageDetails />}
         errorElement={<Error />}
         loader={TopRatedTvsPageDetailsLoader}
      />

      <Route
         path="people"
         element={<PopularPeople />}
         errorElement={<Error />}
         loader={PopularPeopleLoader}
      />
      <Route
         path="people/:id"
         element={<PopularPeopleDetails />}
         errorElement={<Error />}
         loader={PopularPeopleDetailsLoader}
      />
    <Route path="*"  element={<NotFound />} />
   </Route>
))


export default function App() {
   const [isDarkMode, setDarkMode] = useState(false);
   return (
      <ChakraProvider>
         <RouterProvider router={router} />
      </ChakraProvider>
    )
}



