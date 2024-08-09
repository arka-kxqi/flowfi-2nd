import React from "react";
import { ChakraProvider, Box, Flex, Text, HStack, Circle, Divider } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CardComponent = () => {
  return (
    <ChakraProvider>
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Box
          w="300px"
          h="300px"
          bg="gray.500"
          borderRadius="10%"
          position="relative"
          p={4}
          boxShadow="lg"
        >
          <Text fontWeight="bold" fontSize="xl">
            Cancelled
          </Text>
          <Divider />
          <Circle size="50px" top="50%" right={4} bg="gray.200" >
             </Circle>
          <Box >
            <Text fontWeight="bold" fontSize="lg">
            1328
            </Text>
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            Quarter
          </Text>
        </Box>

        <Box
          w="300px"
          h="300px"
          bg="white"
          borderRadius="10%"
          position="relative"
          p={4}
          boxShadow="lg"
        >
          <Text fontWeight="bold" fontSize="xl">
            Active
          </Text>
          <Circle size="50px" top="50%" right={4} bg="gray.200" >
            <CheckIcon color="green.500" boxSize="24px" />
          </Circle>
          <Divider />
          <Circle size="50px" top="50%" right={4} bg="gray.200" >
             </Circle>
          <Box >
            <Text fontWeight="bold" fontSize="lg">
            2612
            </Text>
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            Quarter
          </Text>

        </Box>

        <Box w="300px" h="300px" bg="white" borderRadius="10%" p={4} boxShadow="lg">
          <Text fontWeight="bold" fontSize="xl">
            Active
            <Circle size="50px" top="50%" right={4} bg="gray.200" >
            <CheckIcon color="green.500" boxSize="24px" />
             </Circle>
             <Divider />
             <Circle size="50px" top="50%" right={4} bg="gray.200" >
             </Circle>
          </Text>
          <Box >
            <Text fontWeight="bold" fontSize="lg">
            1820
            </Text>
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            Month
          </Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default CardComponent;
