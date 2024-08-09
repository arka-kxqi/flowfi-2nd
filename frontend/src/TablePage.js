import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  ChakraProvider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "./Navbar";
import ModalComponent from "./ModalComponent"; 

const TablePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <ChakraProvider>
        <Box p={4}>
          <Text fontSize="6xl" fontWeight="bold" mb={4}>
            Capital
          </Text>
          <Box bg="white" borderRadius="lg" boxShadow="lg" p={4}>
            <Flex p={2} borderBottom="1px" borderColor="blue.500">
              <Box w="200px" p={2}>
                Customer
              </Box>
              <Box w="200px" p={2}>
                MRR
              </Box>
              <Box w="200px" p={2}>
                Collection Period
              </Box>
              <Box w="200px" p={2}>
                Payout
              </Box>
              <Box w="200px" p={2}>
                Flow Rate
              </Box>
              <Box w="200px" p={2}>
                Asset
              </Box>
              <Box w="200px" p={2}></Box>
            </Flex>

            {Array.from({ length: 6 }).map((_, index) => (
              <Flex
                key={index}
                p={2}
                borderBottom="1px"
                borderColor="gray.200"
                alignItems="center"
              >
                <Box w="100px" p={2}>
                  <Text fontWeight="bold">Company</Text>
                </Box>
                <Box w="100px" p={2}>
                  $1000
                </Box>
                <Box w="100px" p={2}>
                  1 month
                </Box>
                <Box w="100px" p={2}>
                  $1200
                </Box>
                <Box w="100px" p={2}>
                  100
                </Box>
                <Box w="100px" p={2}>
                  <Box w="30px" h="30px" bg="green.500" />
                </Box>
                <Box w="100px" p={2}>
                  <Button
                    colorScheme="blue"
                    size="md"
                    onClick={handleOpenModal} 
                  >
                    Buy
                  </Button>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      </ChakraProvider>

      <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TablePage;
