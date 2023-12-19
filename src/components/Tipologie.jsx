import { Button, Card, CardBody, Center, Divider, Flex, FormControl, NumberInput, NumberInputField, Text, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import useStore from '../store'

const Tipologie = ({onClose}) => {
  const { settings, saveSettings } = useStore()
  const [prezzi, setPrezzi] = useState(settings.prezzi)
  const [intervallo, setIntervallo] = useState(settings.range)

  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  
  function saveRange() {
    setIsLoading(true)

    saveSettings({ ...settings, 'range': intervallo, 'prezzi': prezzi}).then((r) => {
      toast({ title: 'Tipologie impostate', status: 'success', isClosable: true })
      setTimeout(() => {
        setIsLoading(false)
        onClose()
      }, 300)
    }).catch((e) => {
      toast({ title: 'Errore', description: e.message, status: 'error', isClosable: true })
      setIsLoading(false)
    })
  }

  if (!intervallo) return null

  return (
  <VStack>
  <Center textAlign='center'>
    <VStack>
      <Text fontSize='2xl'>Giacche</Text>
      <Card minW='200px' mx='2'>
        <CardBody textAlign='center' >
          <Flex>
            <FormControl mx='1'>
              <Text>min</Text>
              <NumberInput defaultValue={intervallo.G.min}>
                <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                  onBlur={(e) => setIntervallo({ ...intervallo, G: { min: parseInt(e.target.value), max: intervallo.G.max} })}
                />
              </NumberInput>
            </FormControl>
            <FormControl mx='1'>
            <Text>max</Text>
              <NumberInput defaultValue={intervallo.G.max}>
                <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                  onBlur={(e) => setIntervallo({ ...intervallo, G: { min: intervallo.G.min, max: parseInt(e.target.value)}})}
                />
              </NumberInput>
            </FormControl>

            <FormControl mx='1'>
              <Text>prezzo</Text>
              <NumberInput defaultValue={prezzi?.giacca}>
                <NumberInputField w='70px' min={1} size='lg' px='2'
                  onChange={(e) => setPrezzi({ ...prezzi, giacca: parseInt(e.target.value) })}
                />
              </NumberInput>
            </FormControl>
          </Flex>
        </CardBody>
      </Card>
    </VStack>

      <VStack>
        <Text fontSize='2xl'>Borse</Text>
        <Card minW='200px' mx='2'>
          <CardBody textAlign='center' >
            <Flex>
              <FormControl px='1'>
                <Text>min</Text>
                <NumberInput defaultValue={intervallo.B.min}>
                  <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                    onChange={(e) => setIntervallo({ ...intervallo, B: { min: parseInt(e.target.value), max: intervallo.B.max} })}
                  />
                </NumberInput>
              </FormControl>
              <FormControl px='1'>
                <Text>max</Text>
                <NumberInput defaultValue={intervallo.B.max}>
                  <NumberInputField w='70px' min={1} max={9999} size='lg' px='2'
                    onChange={(e) => setIntervallo({ ...intervallo, B: { min: intervallo.B.min, max: parseInt(e.target.value)}})}
                  />
                </NumberInput>
              </FormControl>
              <FormControl px='1'>
                <Text>prezzo</Text>
                <NumberInput defaultValue={prezzi?.borsa}>
                  <NumberInputField w='70px' min={1} size='lg' px='2'
                    onChange={(e) => setPrezzi({ ...prezzi, borsa: parseInt(e.target.value) })}
                  />
                </NumberInput>
              </FormControl>
            </Flex>
          </CardBody>
        </Card>
      </VStack>
  </Center>
  <Button size='lg' isLoading={isLoading} onClick={()=>saveRange()}>Aggiorna</Button>
  <Divider my='1'/>
  </VStack>
)
}

export default Tipologie