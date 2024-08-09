import React from "react";
import { ChakraProvider, Box, Flex, Text, HStack, Divider } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const ActivityHistoryComponent = () => {
  return (
    <ChakraProvider>
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Box
          w="300px"
          h="500px"
          bg="gray.500"
          borderRadius="10%"
          position="relative"
          p={4}
          boxShadow="lg"
        >
          <Text fontWeight="bold" fontSize="xl">
            History
          </Text>
          <Divider />
          <Box >
          <Box size="50px" bg="white" ></Box>
            <Text fontWeight="bold" fontSize="lg" mt={5} mb = {5}>
            24th June
            <br/>
            $50,000
            </Text>
          </Box>
          <Box >
          <Box size="50px" bg="white" ></Box>
            <Text fontWeight="bold" fontSize="lg" mb = {5}>
            24th June
            <br/>
            $50,000
            </Text>
             </Box >
            <Box >
          <Box size="50px" bg="white" ></Box>
            <Text fontWeight="bold" fontSize="lg" mb = {5}>
            24th June
            <br/>
            $50,000
            </Text>
            </Box >
            <Box size="50px" bg="white" ></Box>
            <Text fontWeight="bold" fontSize="lg" mb = {5}>
            24th June
            <br/>
            $50,000
            </Text>
            </Box >
      </Flex>
    </ChakraProvider>
  );
};

export default ActivityHistoryComponent;
