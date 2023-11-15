import React from 'react';
import { useRouteError } from 'react-router-dom';
import { Text, Box, Heading, Center } from '@chakra-ui/react';
import FullScreenSection from './FullScreenSection';

function Error() {
  const error = useRouteError();

  return (
    <FullScreenSection
      isDarkBackground
      justifyContent="center"
      alignItems="center"
      maxWidth="100%"
      position="relative"
      spacing={4}
      p={8}
    >
      <Box>
        <Center>
          <Heading size="xl" mb={4}>
            Oops! An error occurred.
          </Heading>
        </Center>
        <Text size="lg" mb={4}>
          {error.message}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {error.status} - {error.statusText}
        </Text>
      </Box>
    </FullScreenSection>
  );
}

export default Error;
