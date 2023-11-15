import React, { useState } from "react";
import { useColorMode,
  useColorModeValue,
  Box,
  Input,
  IconButton,
  Collapse,
 } from "@chakra-ui/react";
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';


export default function SearchBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/searched/'+input)
    setInput('');
    toggleSearch();
  }

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  const inputBgColor = useColorModeValue('#F5F5F5', '#1E1E1E')
  const inputColor = useColorModeValue('#333333', '#FFFFFF')

  return (
  <Box position="relative">
      <IconButton
        icon={<FontAwesomeIcon icon={faSearch} />}
        onClick={toggleSearch}
        aria-label="Search"
        variant="ghost"
      />

      <Collapse in={isOpen}  style={{ position: "absolute", top: "50px", right: "110px", zIndex: 2, width: "300px", maxWidth: "800px", background:"white", color: "black" }}>
        <form onSubmit={submitHandler}>
          <Input
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Search Moviess..."
            type='text'
            value={input}
            size="lg"
          />
        </form>
      </Collapse>
    </Box>
  )
}


// Implement a search bar where users can input search queries.