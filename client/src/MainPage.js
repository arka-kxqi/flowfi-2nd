import { useState } from "react";
import { Box, Flex, Text, Button, ChakraProvider, Heading } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import FormPage from "./FormPage";
import FormComponent from "./FormComponent"; 
import TableComponent from './TableComponent';
import CardComponent from './CardComponent';
import AvailableComponent from './AvailableComponent';
import ActivityHistoryComponent from './ActivityHistoryComponent';
import DashboardComponent from './DashboardComponent';

const MainPage = () => {
  const [showContract, setShowContract] = useState(false);
  const [showDeal, setShowDeal] = useState(false);
  const [showTrade, setShowTrade] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAvailable, setShowAvailable] = useState(false);
  const [showActive, setShowActive] = useState(false);
  const [showActivityHistory, setShowActivityHistory] = useState(false);

  const handleButtonClick = (buttonName) => {
    setShowContract(buttonName === "Contract");
    setShowDeal(buttonName === "Deal");
    setShowTrade(buttonName === "Trade");
    setShowDashboard(buttonName === "Dashboard");
    setShowAvailable(buttonName === "Available");
    setShowActive(buttonName === "Active");
    setShowActivityHistory(buttonName === "ActivityHistory");
  };

  return (
    <ChakraProvider>
      <Flex h="100vh">
        <Box bg="blue.500" w="250px" p={4} color="white" >
      {/*<Text isTruncated mt= {25}>
            0x4a...a5f1
          </Text>*/}
          <Text>
            Connected
          </Text>
          <Flex direction="column" mt={55}>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Contract")}
              _hover={{ bg: "blue.600" }}
            >
              Balance
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Deal")}
              _hover={{ bg: "blue.600" }}
            >
              Mint
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Trade")}
              _hover={{ bg: "blue.600" }}
            >
              Assets
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Dashboard")}
              _hover={{ bg: "blue.600" }}
            >
              Dashboard
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Available")}
              _hover={{ bg: "blue.600" }}
            >
              Available
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("Active")}
              _hover={{ bg: "blue.600" }}
            >
              Active
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              mb={2}
              onClick={() => handleButtonClick("ActivityHistory")}
              _hover={{ bg: "blue.600" }}
            >
              Activity History
            </Button>
          </Flex>
        </Box>
        
        <Box flex="1" p={4}>
          {showContract && <FormPage />}
          {showDeal && <FormComponent />}
          {showTrade && <TableComponent />}
          {showDashboard && <DashboardComponent />}
          {showAvailable && <AvailableComponent />}
          {showActive && <CardComponent />}
          {showActivityHistory && <ActivityHistoryComponent />}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default MainPage;
