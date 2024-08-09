import React from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
  ChakraProvider,
  extendTheme,
  CSSReset,
  Card,
  CardBody
} from "@chakra-ui/react";
import image from './136413990_padded_logo.png';

const customTheme = extendTheme({
  styles: {
    global: {
      "colors.#4fd1c5": "#4fd1c5",
      "colors.#81e6d9": "#81e6d9",
      "colors.#667eea": "#667eea",
      "colors.#764ba2": "#764ba2",
      "colors.#fcc419": "#fcc419",
      "colors.#faad14": "#faad14",
    },
  },
});

const FeatureCard = ({ title, description, gradientColor, imageSrc }) => (
  <Box>
    <VStack align="center" spacing={4}>
      <Box
        w={24}
        h={24}
        borderRadius="50%"
        overflow="hidden"
        boxShadow="md"
        bgGradient={gradientColor}
      >
        <Image src={imageSrc} alt="" w="100%" h="100%" />
      </Box>
      <Heading as="h2" fontSize="xl">
        {title}
      </Heading>
      <Text fontSize="md" color="gray.500">
        {description}
      </Text>
    </VStack>
  </Box>
);

const LandingPage = () => {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <Box minHeight="100vh" bgColor="#ffffff">
        <Flex align="center" p={4} justify="space-between">
          <Box>
            <Image
              src={image}
              alt="Logo"
              w={100}
              h={100}
              borderRadius="50%"
              bgColor="#fff"
              boxShadow="lg"
            />
          </Box>
        </Flex>

        <VStack align="center" p={0}>
          <Heading as="h1" fontSize="7xl" fontWeight="bold" color="#172b4d" mt={0}>
            Introducing Equalizer
          </Heading>
          <Box mt={-100} ml={800} display="inline-block">
            <Box
              w={12}
              h={12}
              borderRadius="50%"
              overflow="hidden"
              boxShadow="lg"
              bgColor="#fff"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={image}
                alt="Logo"
                w={50}
                h={50}
                borderRadius="50%"
              />
            </Box>
          </Box>
          <Text fontSize="xl" color="gray.500" mt={12}>
          A Web3 Native Revenue-Based Financing protocol on Linera enabling Web3 businesses to turn their recurring revenue streams into upfront capital.
          </Text>
        </VStack>

        <Box mt = {35}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} px={8}>
            <Card maxW='md' ml ={75}>
            <CardBody>
            <FeatureCard 
              title="Web3 capital platform."
              description="Allowing you to grow on your terms. Equalizer transforms future revenue streams into up-front growth capital for your Web3 business."
              gradientColor="linear(to-tr, #4fd1c5, #81e6d9)"
              imageSrc="/feature-1.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={50}>
            <CardBody>
            <FeatureCard
              title="Working capital that works for you."
              description="Now you can access capital when you need it the most. Equalizer is built with small and mid-sized Web3 businesses in mind."
              gradientColor="linear(to-tr, #667eea, #764ba2)"
              imageSrc="/feature-2.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={25}>
            <CardBody>
            <FeatureCard
              title="Scale"
              description="Built to scale as your Web3 business grows by setting up streams for your recurring revenue, such as subscription payments.              "
              gradientColor="linear(to-tr, #fcc419, #faad14)"
              imageSrc="/feature-3.png"
            />
            </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        <Box mt ={35}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} px={8}>
            <Card maxW='md' ml ={75}>
            <CardBody>
            <FeatureCard 
              title="
              Access instant financing"
              description="Convert your Web3 revenue into working capital with a few clicks."
              gradientColor="linear(to-tr, #4fd1c5, #81e6d9)"
              imageSrc="/feature-1.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={50}>
            <CardBody>
            <FeatureCard
              title="Operate with ease"
              description="Financing on autopilot so you can focus on running your business."
              gradientColor="linear(to-tr, #667eea, #764ba2)"
              imageSrc="/feature-2.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={25}>
            <CardBody>
            <FeatureCard
              title="Censorship Resistant"
              description="Equalizer is a trustless, full decentralized and highly secure protocol."
              gradientColor="linear(to-tr, #fcc419, #faad14)"
              imageSrc="/feature-3.png"
            />
            </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        <Center my={10}>
          <HStack spacing={8}>
          <Box>
            <Button colorScheme="blue" size="lg">
              connect wallet
            </Button>
          </Box>
          </HStack>
        </Center>

        <VStack align="center" p={8}>
          <Heading as="h1" fontSize="2xl" fontWeight="bold" color="#172b4d" mt={0}>
          Invest in a new untapped asset class power by Web3 real-time finance on Linera.
          </Heading>
          <Text fontSize="xl" color="gray.500">
          Harness the stability of recurring revenue streams in real-time and diversify in the Web3 industry.
          </Text>
        </VStack>

        <Box>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8} px={8}>
            <Card maxW='md' ml ={75}>
            <CardBody>
            <FeatureCard 
              title="
              Diversify your portfolio."
              description="Purchase the revenue streams that fit your investment objectives with criteria selection and risk profiling."
              gradientColor="linear(to-tr, #4fd1c5, #81e6d9)"
              imageSrc="/feature-1.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={50}>
            <CardBody>
            <FeatureCard
              title="
              Set your criteria and invest on your terms."
              description="Let us know your target risk profile and we'll take care of the rest."
              gradientColor="linear(to-tr, #667eea, #764ba2)"
              imageSrc="/feature-2.png"
            />
            </CardBody>
            </Card>

            <Card maxW='md' ml ={25}>
            <CardBody>
            <FeatureCard
              title="
              Run your portfolio on autopilot"
              description="Service your investments automatically, while you track performance in your dashboard. "
              gradientColor="linear(to-tr, #fcc419, #faad14)"
              imageSrc="/feature-3.png"
            />
            </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

      </Box>
    </ChakraProvider>
  );
};

export default LandingPage;
