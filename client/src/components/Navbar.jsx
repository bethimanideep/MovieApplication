import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box
      backgroundColor="purple.500"
      mb={5}
      p={4}
      position="fixed"
      width="100%"
      top="0"
      zIndex="1000"
      boxShadow="md"
    >
      <Heading color="white">Movies</Heading>
    </Box>
  );
};

export default Navbar;
