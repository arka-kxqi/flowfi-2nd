import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  ChakraProvider,
  Divider,
} from "@chakra-ui/react";

const DashboardComponent = () => {
  return (
    <div>
      <ChakraProvider>
      <Flex flexDirection="column" alignItems="center" p={4}>
      <Text fontSize="3xl" fontWeight="bold">
              27th February
            </Text>
        <Box w="550px" h="300px" bg="white" borderRadius="lg" p={4} boxShadow="lg" mb={4}>
        <Text fontSize="2xl" >
            Your Trade
            </Text>
            <Text fontSize="1xl" >
              Recurring Revenue Trading
            </Text>
            <Text fontSize="2xl" fontWeight="bold" >
            $503.00,00
            </Text>
            <Text fontSize="1xl" >
            Your Payout
            </Text>
            <Divider />
                <Flex justifyContent="space-between">
                  <Box >
                    <Text >Term Length</Text>
                    <Text>Discount Rate</Text>
                    <Text>Traded</Text>
                    <Text>Churned</Text>
                  </Box>
                  <Divider />
                  <Box>
                    <Text>12 mon</Text>
                    <Text>6%</Text>
                    <Text>56 contracts</Text>
                    <Text>1 contract</Text>
                  </Box>
                </Flex>

            </Box>
            <Box w="550px" h="300px" bg="white" borderRadius="lg" p={4} boxShadow="lg" mb={4}>
            <Text fontSize="1xl" >
                Payment
            </Text>
            <Text fontSize="2xl" fontWeight="bold" >
                Fully Paid
            </Text>
            <Text fontSize="1xl" >
                This trade is fully paid
            </Text>
            <Divider />
                <Flex justifyContent="space-between">
                  <Box >
                    <Text >Total Paid</Text>
                    <Text>Total Remaining</Text>
                  </Box>
                  <Divider />
                  <Box>
                    <Text>$20,000.00</Text>
                    <Text>10%</Text>
                    <Text>$0.00</Text>
                    <Text>0/12</Text>
                  </Box>
                </Flex>
            </Box>
            </Flex>
            <Divider />
            <Text fontSize="1xl" >
                Assets traded
            </Text>

        <Flex>
          <Box flex="1" p={4}>
            <Box bg="white" borderRadius="lg" boxShadow="lg" p={4}>
              <Flex p={2} borderBottom="1px" borderColor="blue.500">
                <Box w="200px" p={2}>
                  Customer
                </Box>
                <Box w="200px" p={2}>
                  MRR
                </Box>
                <Box w="200px" p={2}>
                  Start Date
                </Box>
                <Box w="200px" p={2}>
                  Term Length
                </Box>
                <Box w="200px" p={2}>
                  Payout
                </Box>
              </Flex>

              {Array.from({ length: 3 }).map((_, index) => (
                <Flex
                  key={index}
                  p={2}
                  borderBottom="1px"
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <Box w="200px" p={2}>
                    <Box w="30px" h="30px" bg="green.500" />
                    <Text fontWeight="bold">Company NEW</Text>
                  </Box>
                  <Box w="200px" p={2}>
                    $3753
                  </Box>
                  <Box w="200px" p={2}>
                    March 8, 2023
                  </Box>
                  <Box w="200px" p={2}>
                    12 months
                  </Box>
                  <Box w="200px" p={2}>
                    $1000.45
                  </Box>
                </Flex>
              ))}
            </Box>
            

            
        </Box>
        </Flex>
        
      </ChakraProvider>
    </div>
  );
};

export default DashboardComponent;
