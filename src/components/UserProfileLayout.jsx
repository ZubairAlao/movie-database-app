import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { HStack, VStack, Box } from '@chakra-ui/react';
import FullScreenSection from './FullScreenSection';

function UserProfileLayout() {

  const activeStyle = {
    fontWeight: "bold",
    backgroundColor: 'trasparent',
    color: '#4CAF50',
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
      <VStack>
        <Box
          marginRight={4}
          height="100%"
        >
          <HStack alignItems="start">
            <NavLink to="." end style={({isActive}) => isActive ? activeStyle : null}>
              User Profile
            </NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="user-favorite-movies">
              Favorite Movies
            </NavLink>
            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="user-favorite-tvs">
              Favorite TVs
            </NavLink>
          </HStack>
        </Box>
        <main>
          <Outlet />
        </main>
      </VStack>
    </FullScreenSection>
  );
}

export default UserProfileLayout;
