import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,faChevronDown, faUser
 } from "@fortawesome/free-solid-svg-icons";
 import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
 import MovieMazeLogo from '../img/moviemaze-logo.png';
import { useColorMode, useColorModeValue, Box, HStack, Button, Image, Flex } from "@chakra-ui/react";
import { NavLink, Link, useLocation } from 'react-router-dom';
import SearchBar from "./SearchBar";
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Select,
    Text,
  } from '@chakra-ui/react'

  import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'


// MovieMaze
export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('#F5F5F5', '#1E1E1E')
    const color = useColorModeValue('#333333', '#FFFFFF')
    const location = useLocation();
    const headerRef = useRef(null);
    
    // chakra drawer
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef();

    const activeStyle = {
    fontWeight: "bold",
    backgroundColor: 'trasparent',
    color: '#4CAF50',
  }
   
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        let prevScrollPos = window.scrollY;

        const handleScroll = () => {
            const currentScrollPos =  window.scrollY;
            const headerElement =  headerRef.current;
            if (!headerElement) {
                return;
            }
            if (prevScrollPos > currentScrollPos) {
                headerElement.style.transform = "translateY(0)";
                // Add bottom padding when the header is visible
                document.body.style.paddingTop = `${headerElement.clientHeight}px`; // Reset padding
            } else {
                headerElement.style.transform = "translateY(-200px)";
                // remove bottom padding when the header is not visible
                document.body.style.paddingTop = "0";
            }
            prevScrollPos = currentScrollPos;
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []);


  return (
     <Box
            position="fixed"
            zIndex={2}
            top={0}
            left={0}
            right={0}
            translateY={0}
            transitionProperty="transform"
            transitionDuration=".3s"
            transitionTimingFunction="ease-in-out"
            backgroundColor={bg}
            color={color}
            boxShadow="2px 2px 4px rgba(0, 0, 0, 0.2)"
            ref={headerRef}
        >
            <Box maxWidth="1280px" margin="0 auto">
                <HStack
                    px={12}
                    py={2}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Link to="/" >
                        <Flex align="center" justifyContent="center" fontSize="2xl">
                                <Image boxSize="50px" display="inline" src={MovieMazeLogo} alt="moviemaze logo" />
                                <Text style={{ fontSize: ".7em", marginLeft: ".5em" }} display={{ base: "none", md: "inline" }}>
                                    MovieMaze
                                </Text>
                        </Flex>
                    </Link>
                    <nav>
                        <HStack spacing={4} display={{ base: "none", lg: "flex" }}>
                                <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/" >Home</NavLink>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                                        Movies
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>
                                            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/movie">Popular</NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/top-rated-movies">Top Rated</NavLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <Menu>
                                    <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                                        TV Shows
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>
                                            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/tv">Popular</NavLink>
                                        </MenuItem>
                                        <MenuItem>
                                            <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/top-rated-tvs">Top Rated</NavLink>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <NavLink style={({isActive}) => isActive ? activeStyle : null} to="/people">People</NavLink>
                                <NavLink to="/login">
                                        Login
                                </NavLink>
                        </HStack>
                        <Drawer
                            isOpen={isOpen}
                            placement="right"
                            onClose={() => {
                                onClose(); // Close the Drawer when onClose is called
                            }}
                            finalFocusRef={btnRef} >
                                <DrawerOverlay />
                                <DrawerContent backgroundColor={bg} color={color}>
                                <DrawerCloseButton />
                                <DrawerBody display="flex" flexDirection="column" mt={100} gap="1.2rem">
                                    {/* Mobile Menu items */}
                                    <Link onClick={() => {onClose(); }} to="/" >Home</Link>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                                            Movies
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <NavLink onClick={() => {onClose(); }} to="/movie">Popular</NavLink>
                                            </MenuItem>
                                            <MenuItem>
                                                <NavLink onClick={() => {onClose(); }} to="/top-rated-movies">Top Rated</NavLink>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                                            TV Shows
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <NavLink onClick={() => {onClose(); }} to="/tv">Popular</NavLink>
                                            </MenuItem>
                                            <MenuItem>
                                                <NavLink onClick={() => {onClose(); }} to="/top-rated-tvs">Top Rated</NavLink>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Link onClick={() => {onClose(); }} to="/people">People</Link>
                                    <Link onClick={() => {onClose(); }} to="/login">
                                            Login
                                    </Link>
                                </DrawerBody>
                                </DrawerContent>
                            </Drawer>
                    </nav>
                    <HStack gap="0.3rem">
                    <Button ref={btnRef}  color={color}  onClick={onOpen} display={{ base: "block", lg: "none" }}>
                        <FontAwesomeIcon icon={faBars}  />
                    </Button>
                    <FontAwesomeIcon icon={faUser} />
                    <SearchBar />
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? (
                        <>
                            <FontAwesomeIcon icon={faMoon} />
                        </>
                        ) : (
                        <>
                            <FontAwesomeIcon icon={faSun} />
                        </>
                        )}
                    </Button>
                    </HStack>
                </HStack>
            </Box>
        </Box>
  )
}
