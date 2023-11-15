import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const Card = ({ imageSrc, title, name, releaseDate, ratings, FirstAirDate, popularity, link }) => {
  return (
    <Box
      maxW="xs"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      _hover={{
        transform: "scale(1.03)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <Link to={link} style={{ textDecoration: 'none', display: 'block' }}>

        <Image src={imageSrc} alt={title} width="xs" height="auto" />

        {/* Absolute positioning for the rating badge */}
        <Box
          position="absolute"
          bottom="20"
          left="5"
          bg="#FFC107"
          color="#333333"
          borderRadius="full"
          padding="4px"
          fontWeight="bold"
          fontSize="12px"
        >
          {ratings}
          {popularity}
        </Box>

        <Box p="2"> {/* Adjust the padding as needed */}
          <Text fontWeight="semibold" fontSize="lg" noOfLines={1}>
            {title}
            {name}
          </Text>

          <Text fontSize="sm" mb="2">
            {releaseDate}
            {FirstAirDate}
          </Text>
        </Box>
      </Link>

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
                <MenuItem>Add Favorite</MenuItem>
            </MenuList>
          </Menu>
      </Box>
    </Box>
  );
};

export default Card;