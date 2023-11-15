import * as React from "react";
import {VStack, useColorMode, useColorModeValue } from "@chakra-ui/react";

/**
 * Illustrates the use of children prop and spread operator
 */

const FullScreenSection = ({children, isDarkBackground, ...boxProps}) => {
    
    const { colorMode, toggleColorMode } = useColorMode();
    const bg = useColorModeValue('#F5F5F5', '#1E1E1E')

    return (
        <VStack
            backgroundColor={bg}
            color={colorMode === "light" ? "#333333" : "#FFFFFF"}
        >
            <VStack maxWidth="1280px" minHeight="100vh" {...boxProps}>
                {children}
            </VStack>
        </VStack>
    )
}

export default FullScreenSection;