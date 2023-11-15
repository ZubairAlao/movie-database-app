import React from 'react'
import { Box, Text, Flex, Stack, useColorMode, Link, Image } from "@chakra-ui/react";
import movieMazeLogo from '../img/moviemaze-logo.png'

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={colorMode === "light" ? "#333333" : "#F5F5F5"} color={colorMode === "light" ? "#FFFFFF" : "#1E1E1E"} py={4} textAlign="center">
      
      <Flex justify="center" align="center" gap="2rem" flexDirection={{ base: "column", lg: "row" }}>
        <Link to="/" mb={4}>
          <Flex align="center" justifyContent="center" fontSize="2xl">
            <Image boxSize="50px" display="inline" src={movieMazeLogo} alt="MovieMaze Logo" />
            <span style={{ fontSize: ".7em", marginLeft: ".5em" }}>MovieMaze</span>
          </Flex>
        </Link>

        <Stack spacing={4}>
          <Text fontSize="xl">Contact Information</Text>
          <Text>Email: moviemaze@example.com</Text>
          <Text>Phone: +1 (123) 456-7890</Text>
        </Stack>

        <Text mt={4}>© 2023 MovieMaze. All rights reserved.</Text>
      </Flex>
    </Box>
  )
}


// Include a footer with copyright and additional information about your app.