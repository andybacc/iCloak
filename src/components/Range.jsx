import React, { useState } from 'react'
import { Button, VStack, HStack, Card, Flex, CardBody, Center, FormControl, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import useStore from '../store'
import { useToast } from '@chakra-ui/toast'

const Range = () => {
  const { range, setRange } = useStore()
  const [intervallo, setIntervallo] = useState(range)
  const toast = useToast()
  
  function saveRange() {
    setRange(intervallo)
    toast({ title: 'Range impostato', status: 'success', isClosable: true })
  }

  return (
  <VStack>
  <Center textAlign='center'>
    <VStack>
      <Text fontSize='lg'>Range giacche</Text>
      <Card minW='200px' mx='2'>
        <CardBody textAlign='center' >
          <Flex>
            <FormControl>
              <Text>min</Text>
              <NumberInput defaultValue={intervallo.G.min}>
                <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                  onBlur={(e) => setIntervallo({ ...intervallo, G: { min: parseInt(e.target.value), max: intervallo.G.max} })}
                />
              </NumberInput>
            </FormControl>
            -
            <FormControl>
            <Text>max</Text>
              <NumberInput defaultValue={intervallo.G.max}>
                <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                  onBlur={(e) => setIntervallo({ ...intervallo, G: { min: intervallo.G.min, max: parseInt(e.target.value)}})}
                />
              </NumberInput>
            </FormControl>
          </Flex>
        </CardBody>
      </Card>
    </VStack>

      <VStack>
        <Text fontSize='lg'>Range borse</Text>
        <Card minW='200px' mx='2'>
          <CardBody textAlign='center' >
            <Flex>
              <FormControl>
                <Text>min</Text>
                <NumberInput defaultValue={intervallo.B.min}>
                  <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                    onChange={(e) => setIntervallo({ ...intervallo, B: { min: parseInt(e.target.value), max: intervallo.B.max} })}
                  />
                </NumberInput>
              </FormControl>
              -
              <FormControl>
                <Text>max</Text>
                <NumberInput defaultValue={range.B.max}>
                  <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                    onChange={(e) => setIntervallo({ ...intervallo, B: { min: intervallo.B.min, max: parseInt(e.target.value)}})}
                  />
                </NumberInput>
              </FormControl>
            </Flex>
          </CardBody>
        </Card>
      </VStack>
  </Center>
  <Button variant='solid' color='teal' size='sm' onClick={()=>saveRange()}>Aggiorna</Button>
  </VStack>
)
}

export default Range