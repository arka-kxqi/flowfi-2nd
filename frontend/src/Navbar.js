import { useState } from "react";
import {
  ChakraProvider,
  Box,
  Flex,
  Spacer,
  Button,
  Stack
} from "@chakra-ui/react";
import ConnWallComponent from './ConnWallComponent';
// import { ethers } from "ethers";

function Navbar() {
//   const [isConnected, setIsConnected] = useState(false);

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       console.log("Metamask detected");
//       try {
//         await window.ethereum.enable();
//         console.log("Wallet connected");
//         const provider = new ethers.providers.Web3Provider(window.ethereum); 
//         setIsConnected(true);
//       } catch (error) {
//         console.error("Error connecting to wallet:", error);
//       }
//     } else {
//       console.error("Metamask not found");
//     }
//   };
    
      const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  

  return (
      <>
    <ChakraProvider>
    <Flex p="4" alignItems="center">
      <Box w="50px" h="50px" borderRadius="full" bg="blue.500" mr="4">
      </Box>
      <Box w="1px" h="50px" bg="gray.300" mx="4" />
      <Stack direction="row" spacing={2}>
      <a href=".\main">
      <Button >Home</Button>
      </a>
      <a href=".\table">
      <Button >Capital</Button>
      </a>
      {/*<Button >Finance</Button>*/}
      </Stack>
      {/* {isConnected && (
        <>
          <Button>History</Button>
          <Spacer />
        </>
      )} */}
      <Spacer />
      <Button colorScheme="blue" 
      onClick={handleOpenModal} 
    >
        Connect Wallet
      </Button>
    </Flex>
    </ChakraProvider>
      <ConnWallComponent isOpen={isModalOpen} onClose={handleCloseModal} />
      </>
  );
}

export default Navbar;
