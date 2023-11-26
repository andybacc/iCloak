import React from 'react'
import { Card, CardBody, Center, FormControl, NumberInput, NumberInputField, Text } from '@chakra-ui/react'
import useStore from '../store'

const Iniziali = () => {
    const { inizialeG, inizialeB, setInizialeG, setInizialeB } = useStore()

  return (
    <Center textAlign='center'>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>N. iniziale giacche</Text>
        <FormControl>
          <NumberInput defaultValue={inizialeG}>
            <NumberInputField w='90px' min={1} max={999} id="inizialeG" size='lg' />
          </NumberInput>
        </FormControl>
      </CardBody>
    </Card>
    <Card minW='200px' mx='2'>
      <CardBody textAlign='center' >
        <Text fontSize='lg'>N. iniziale borse</Text>
        <FormControl>
          <NumberInput defaultValue={inizialeB}>
            <NumberInputField w='90px' min={1} max={999} id="inizialeB" size='lg'
                onBlur={(e) => setInizialeB(e.target.value)}
            />
          </NumberInput>
        </FormControl>
      </CardBody>
    </Card>
</Center>
)
}

export default Iniziali