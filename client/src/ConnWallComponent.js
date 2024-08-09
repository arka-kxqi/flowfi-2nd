import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Flex,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
  ChakraProvider,
    Link as ReachLink
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ConnWallComponent = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(500000); 
  const handleChangeAmount = (value) => {
    setAmount(value);
  };
  const [port, setPort] = useState('');
    const handleChangePort = (e) => {
        setPort(e.target.value);
    };
  return (
    <ChakraProvider>
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent alignItems="left" justifyContent="center" display="flex">
        <ModalHeader>Connect your wallet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box my={4} borderBottom="1px" borderColor="gray.200" />

          <Flex justify="space-between" my={2}>
            <Text>Wallet address</Text>
            <Input placeholder='port' value={port} onChange={handleChangePort}/>
          </Flex>

          <Box my={4} borderBottom="1px" borderColor="gray.200" />

        </ModalBody>
        <ModalFooter>
          <a href={'/' + port + '/main'}>
          <Button colorScheme="blue" w="full" mt={50} mb={5} onClick={onClose}>
            Connect
          </Button>
      </a>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </ChakraProvider>
  );
};

export default ConnWallComponent;
