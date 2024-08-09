import React from "react";
import {
  Box,
  Heading,
  Flex,
  Select,
  Input,
  Text,
  IconButton,
  Stack,
  Switch, 
  Button,
} from "@chakra-ui/react";
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper }from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { gql, useLazyQuery, useSubscription, useMutation } from "@apollo/client";
const MINT = gql`
    mutation {
      mint (
        name: $name,
        description: "",
        keywords: "",
        segments: $segments
        )
    }
`;


const FormComponent = () => {
    //why i hate javascript so much
    const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
    const template = {index: 0, start: 0, end: 0, length: 0, exponent: 1, period: 1}
    const [sections, setSections] = useState([template]);
    const [name, setName] = useState("");

    const handleChangeSections = (e) => {
        var sec = sections;
        while (e.target.value > sec.length) {
            var temp = template;
            temp.index = sec.length;
            sec.push({index: sec.length, start: 0, end: 0, length: 0, exponent: 1, period: 1});
        }
        while (e.target.value < sec.length) {
            sec.pop();
        }
        const what = sec;
        setSections(pls => what);
        forceUpdate();
    }

    const handleChange = (e, str, ind) => {
        var sec = [...sections];
        sec = sec.map((x) => {
            if (x.index === ind) x[str] = +e;
            return x;
        });
        setSections(sec);
        forceUpdate();

    }

        const [makeMint, { loading: mintLoading }] = useMutation(MINT, {
  });

    const onMake = () => {
        var segments = [{
            period: sections[0].period,
            constant: sections[0].start * 1000000000000000000,
            factor: (sections[0].end - sections[0].start) * 1000000000000000000,
            exponent: sections[0].exponent * 1000000000000000000,
            milestone: sections[0].length,
        }];
        for (var i = 1; i < sections.length; i += 1) {
            segments.push({
                period: sections[i].period,
                constant: sections[i].start * 1000000000000000000,
                factor: (sections[i].end - sections[0].start) * 1000000000000000000,
                exponent: sections[i].exponent * 1000000000000000000,
                milestone: segments[i - 1].milestone + sections[i].length,
            });
        }
makeMint({
    variables: {segments: segments, name: name}
});
    }


  return (
    <Box p={4}>
      <Heading size="lg" mb={4}>
        Create a stream
      </Heading>

      {/*<Heading size="md" mb={2}>
        Select a Contract
      </Heading>
      <Select placeholder="Public Address, ENS or Lens">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>*/}

      <Flex my={4} alignItems="center">

      <Flex my={4}>
        <Box>
      <Heading size="md" my={2}>
        number of sections
      </Heading>
      <Flex alignItems="center">
        <Input placeholder="#" type="number" w="100px" mr={2} value={sections.length} onChange={(e) => handleChangeSections(e)}/>
      </Flex>
      </Box>
        <Box>
      <Heading size="md" my={2}>
        name
      </Heading>
      <Flex alignItems="center">
        <Input w="500px" mr={2} value={name} onChange={(e) => setName(e.target.value)}/>
      </Flex>
      </Box>
      </Flex>


      {/*<Box>
        <Heading size="md" mr={2}>
          Flow Rate
        </Heading>
        
        <Input type="number" w="100px" />
       </Box>

        <Select w="120px" ml={2}>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </Select>*/}
      </Flex>

      {/*<Box>
          <Heading size="md">Start Date</Heading>
          <Input type="date" mt={2} />
        </Box>
        <Box ml={4}>
          <Heading size="md">End Date</Heading>
          <Input type="date" mt={2} />
        </Box>*/}
      {sections.map((section, id) => 
      <Flex my={4} key={section.index}>
        <Box>
      <Heading size="md" my={2}>
        Starting share
      </Heading>
          <NumberInput key={section.index} defaultValue={0} min={0} max={1} precision={6} step={0.000001} value={section.start} onChange={(e) => handleChange(e, 'start', section.index)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
          {/*<Select placeholder="Select unit">
        <option value="percent">%</option>
        <option value="permill">‰</option>
        <option value="ppt">‱</option>
      </Select>*/}

        </Box>
        <Box>
      <Heading size="md" my={2}>
        Ending share
      </Heading>
<NumberInput key={section.index} defaultValue={0} min={0} max={1} precision={6} step={0.000001} value={section.end} onChange={(e) => handleChange(e, 'end', section.index)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>

          {/*<Select placeholder="Select unit">
        <option value="percent">%</option>
        <option value="permill">‰</option>
        <option value="ppt">‱</option>
      </Select>*/}
        </Box>
        <Box>
      <Heading size="md" my={2}>
        Curviness
      </Heading>
<NumberInput key={section.index} defaultValue={0} min={0} max={100} precision={6} step={0.001} value={section.exponent} onChange={(e) => handleChange(e, 'exponent', section.index)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
        </Box>
        <Box>
      <Heading size="md" my={2}>
        Time Length (sec)
      </Heading>
<NumberInput key={section.index} defaultValue={0} min={1} max={1000000000} precision={6} step={1} value={section.length} onChange={(e) => handleChange(e, 'length', section.index)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
          {/*<Select placeholder="Select unit">
        <option value="seconds">seconds</option>
        <option value="minutes">minutes</option>
        <option value="hours">hours</option>
        <option value="days">days</option>
        <option value="months">30 days</option>
        <option value="years">365 days</option>
      </Select>*/}
        </Box>
        <Box>
      <Heading size="md" my={2}>
        Period (sec)
      </Heading>
<NumberInput key={section.index} defaultValue={0} min={1} max={1000000000} precision={6} step={1} value={section.period} onChange={(e) => handleChange(e, 'length', section.period)}>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
          {/*<Select placeholder="Select unit">
        <option value="seconds">seconds</option>
        <option value="minutes">minutes</option>
        <option value="hours">hours</option>
        <option value="days">days</option>
        <option value="months">30 days</option>
        <option value="years">365 days</option>
      </Select>*/}
        </Box>
      </Flex>
      )}
      <Text>preview your stream: (y axis is revenue multiplier, x axis is time) https://www.desmos.com/calculator/hyotkncgrv </Text>
      <Button colorScheme="blue" mt={4} w="full" onClick={onMake}>
        Send Stream
      </Button>
    </Box>
  );
};

export default FormComponent;
