import React from 'react'
import { Card, Flex, CardBody, Center, FormControl, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import useStore from '../store'
import { useToast } from '@chakra-ui/toast'

const Range = () => {
  const { range, setRange } = useStore()
  const toast = useToast()
  
  function handleRange(value) {
    toast({ title: 'Range impostato', status: 'success', isClosable: true })
    setRange(value)
  }

  return (
    <Center textAlign='center'>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>Range giacche</Text>
        <Flex>
          <FormControl>
            <NumberInput defaultValue={range.G.min}>
              <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                onBlur={(e) => handleRange({ ...range, G: { min: parseInt(e.target.value), max: range.G.max} })}
              />
            </NumberInput>
          </FormControl>
          <FormControl>
            <NumberInput defaultValue={range.G.max}>
              <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                onBlur={(e) => handleRange({ ...range, G: { min: range.G.min, max: parseInt(e.target.value)}})}
              />
            </NumberInput>
          </FormControl>
        </Flex>
      </CardBody>
    </Card>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>Range borse</Text>
        <Flex>
          <FormControl>
            <NumberInput defaultValue={range.B.min}>
              <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                onBlur={(e) => handleRange({ ...range, B: { min: parseInt(e.target.value), max: range.B.max} })}
              />
            </NumberInput>
          </FormControl>
          <FormControl>
            <NumberInput defaultValue={range.B.max}>
              <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                onBlur={(e) => handleRange({ ...range, B: { min: range.B.min, max: parseInt(e.target.value)}})}
              />
            </NumberInput>
          </FormControl>
        </Flex>
      </CardBody>
    </Card>
</Center>
)
}

export default Range