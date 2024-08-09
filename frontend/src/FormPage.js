import { Box, Heading, Flex, Input, Button, Select, Text } from "@chakra-ui/react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { gql, useLazyQuery, useSubscription, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_BALANCE = gql`
	query {
	    balance
	}
`;

const MAKE_PAYMENT = gql`
    mutation {
        income(amount: $amount, keyword: $keyword)
    }
`;


const FormPage = () => {
  const [amount, setAmount] = useState(500000); 
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState('');
    const handleChangeAmount = (value) => {
    setAmount(value);
  };
	const [balance, setBalance] = useState(0.0);

	const [loadBalance, { called: balanceCalled, loading: balanceLoading, data: balanceData, error: balanceError }] = useLazyQuery(GET_BALANCE, {
		onCompleted: (data) => {
			setBalance(data.balance);
		},
	});

	if (!balanceCalled) {
		void loadBalance();
	}
console.log(JSON.stringify(balanceError));

    const [makePayment, { loading: paymentLoading }] = useMutation(MAKE_PAYMENT, {
    onError: (error) => setError("Error: " + error.networkError.result),
  });

const onSimulate = () => {
makePayment({
variables : {amount: amount.toFixed(18), keyword: keyword},
});
};

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value);
    };


  return (
    <Box p={4}>
      <Heading as="h2" size="lg" mb={4} alignItems="center" justifyContent="center" display="flex">
        Your balance
      </Heading>
      <Box
        bg="gray.100"
        p={4}
        borderRadius="md"
        alignItems="center"
      >
      {balanceData ? (
        <Heading justifyContent="center">{(balance/1).toFixed(18) + " Tokens"}</Heading>
      ) : (
        <Heading>Loading ...</Heading>
      )}
      <Box my={4}></Box>
      {balanceError && (<Text color='tomato'>{balanceError.message}</Text>)}
      </Box>
      <Box h={50}></Box>
      <Heading as="h2" size="lg" mb={4} alignItems="left" justifyContent="center" display="flex">
        Simulate Income
      </Heading>
      <Box
        bg="gray.100"
        p={4}
        borderRadius="md"
        alignItems="center"
      >
                <Text fontSize="4xl" fontWeight="bold" mb={4}>
            {amount} Tokens
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
                <Flex justify="space-between" my={2}>
            <Text>Keyword</Text>
            <Input bg='blue.100' variant="filled" value={keyword} onChange={handleChangeKeyword}/>
          </Flex>

          <Button colorScheme="blue" w="full" mt={50} mb={5} onClick={onSimulate}>
            Simulate
          </Button>
      {error && <Text color='tomato'>{error}</Text>}

      </Box>
    </Box>
  );
};

export default FormPage;
