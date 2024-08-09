import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  ChakraProvider,
  Divider,
  Slider,
  SliderThumb,
  SliderFilledTrack,
  SliderTrack,
  TabPanels,
  TabPanel,
  Tabs,
  TabList,
  Tab
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { gql, useLazyQuery, useSubscription, useMutation } from "@apollo/client";

const GET_TOKENS = gql`
	query {
	    ownedTokens{
            id
            metadata{
                name
                image
            }
        }
	}
`;

const RECEIVE = gql`
    mutation{
        receive (id: $id)
        }
`;

const TableComponent = () => {

	const [tokens, setTokens] = useState([]);

	const [loadTokens, { called: tokensCalled, loading: tokensLoading, data: tokensData, error: tokensError }] = useLazyQuery(GET_TOKENS, {
		onCompleted: (data) => {
			setTokens(data.ownedTokens);
		},
	});

    if (!tokensCalled) {
        loadTokens();
    }


        const [makeReceive, { loading: receiveLoading }] = useMutation(RECEIVE, {});

    const handleReceive = (id) => {
makeReceive({
    variables: {id: id}
});
    }

  return (
    <div>
      <ChakraProvider>
        <Flex>
          <Box flex="1" p={4}>
            <Text fontSize="3xl" fontWeight="bold">
              Your assets
            </Text>
            <Text fontSize="1xl" mb={4}>
              View, receive, and list your assets.
            </Text>
            <Box bg="white" borderRadius="lg" boxShadow="lg" p={4}>
              <Flex p={2} borderBottom="1px" borderColor="blue.500">
                <Box w="200px" p={2}>
                  Token ID
                </Box>
                <Box w="200px" p={2}>
                  Stream ID
                </Box>
                <Box w="200px" p={2}>
                  Name
                </Box>
              </Flex>

              {tokens.map((token, index) => (
                <Flex
                  key={index}
                  p={2}
                  borderBottom="1px"
                  borderColor="gray.200"
                  alignItems="center"
                >
                  <Box w="200px" p={2}>
                  {/*<Box w="30px" h="30px" bg="green.500" />*/}
                    <Text fontWeight="bold">{JSON.stringify(token.id)}</Text>
                  </Box>
                  <Box w="200px" p={2}>
                  {token.metadata.image}
                  </Box>
                  <Box w="200px" p={2}>
                  {token.metadata.name}
                  </Box>
                  <Box w="200px" p={2}>
                  <Button onClick={() => handleReceive(token.id)} >Receive</Button>
                  </Box>
                </Flex>
              ))}
            </Box>
            

      {/* <Flex flexDirection="column" alignItems="center" p={4}>
        <Box w="550px" h="400px" bg="white" borderRadius="lg" p={4} boxShadow="lg" mb={4}>
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Summary</Tab>
              <Tab>Schedule</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Flex justifyContent="space-between">
                  <Box >
                    <Text >Payout Summary</Text>
                    <Text>Selected Subscriptions</Text>
                    <Text>Payout</Text>
                    <Text>Cancellations</Text>
                    <Divider />
                    <Text>Payout Date</Text>                    
                  </Box>
                  <Box>
                    <Text>.</Text>
                    <Text>47</Text>
                    <Text>$433,571</Text>
                    <Text>$0</Text>
                    <Divider />
                    <Text>Instant</Text>
                  </Box>
                </Flex>
                <Text>Total Payout</Text>
                <Slider aria-label='slider-ex-1' defaultValue={30}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
                </Slider>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Button w="500px" colorScheme="blue">
            Review Order
          </Button>
        </Box>
      </Flex>*/}
        </Box>
        </Flex>
        
      </ChakraProvider>
    </div>
  );
};

export default TableComponent;
