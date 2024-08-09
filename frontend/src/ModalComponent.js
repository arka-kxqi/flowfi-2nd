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
  ChakraProvider
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const ModalComponent = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(500000); 
  const handleChangeAmount = (value) => {
    setAmount(value);
  };

  return (
    <ChakraProvider>
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent alignItems="left" justifyContent="center" display="flex">
        <ModalHeader>Choose Amount</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="4xl" fontWeight="bold" mb={4}>
            ${amount} 
          </Text>
          <Slider
            aria-label="Amount Slider"
            defaultValue={500}
            min={10000}
            max={1000000}
            step={500}
            onChange={handleChangeAmount}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Box my={4} borderBottom="1px" borderColor="gray.200" />

          <Flex justify="space-between" my={2}>
            <Text>Payback period</Text>
            <Text>12 months</Text>
          </Flex>

          <Box my={4} borderBottom="1px" borderColor="gray.200" />

          <Flex justify="space-between" my={2}>
            <Text>Payout to</Text>
            <Box display="flex" alignItems="center">
              <Text mr={2} isTruncated>
                0x43f...D2aB
              </Text>
              <IconButton
                aria-label="Copy Address"
                icon={<ChevronRightIcon />}
                size="sm"
              />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" w="full" mt={50} mb={5} onClick={onClose}>
            Review your order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </ChakraProvider>
  );
};

export default ModalComponent;
