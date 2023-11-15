import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Button, VStack } from "@chakra-ui/react";
import FullScreenSection from '../components/FullScreenSection';

function NotFound() {
  return (
    <FullScreenSection
      isDarkBackground
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={8}
    >
      <VStack spacing={4} textAlign="center">
        <Heading fontSize="4xl" color="white">
          Sorry, the page you were looking for is not found.
        </Heading>
        <Link to="/" fontSize="xl">
          <Button>
            Return to Home
          </Button>
        </Link>
      </VStack>
    </FullScreenSection>
  );
}

export default NotFound;
