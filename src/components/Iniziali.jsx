import React from 'react'
import { Card, CardBody, Center, FormControl, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import useStore from '../store'
import { useToast } from '@chakra-ui/toast'

const Iniziali = () => {
  const { iniziali, setIniziali } = useStore()
  const toast = useToast()
  
  function handleIniziali(value) {
    toast({ title: 'Numero impostato', status: 'success', isClosable: true })
    setIniziali(value)
  }

  return (
    <Center textAlign='center'>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>N. iniziale giacche</Text>
        <FormControl>
          <NumberInput defaultValue={iniziali.G}>
            <NumberInputField w='90px' min={1} max={999} id="inizialeG" size='lg' 
              onBlur={(e) => handleIniziali({'G': parseInt(e.target.value), 'B':iniziali.B})}
            />
          </NumberInput>
        </FormControl>
      </CardBody>
    </Card>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>N. iniziale borse</Text>
        <FormControl>
          <NumberInput defaultValue={iniziali.B}>
            <NumberInputField w='90px' min={1} max={999} id="inizialeB" size='lg'
                onBlur={(e) => handleIniziali({'G':iniziali.G, 'B': parseInt(e.target.value)})}
            />
          </NumberInput>
        </FormControl>
      </CardBody>
    </Card>
</Center>
)
}

export default Iniziali