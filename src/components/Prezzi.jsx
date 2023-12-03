import { Box, Button, Center, Container, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import useStore from '../store'

const Prezzi = ({onClose}) => {
    const { prezzi, setPrezzi } = useStore()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    function savePrezzi() {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setPrezzi(prezzi)
            toast({
                title: 'Prezzi aggiornati',
                status: 'success', 
                isClosable: true
            })
            onClose()
        }, 500);
    }
  return (
    <Container>
        <Text fontSize='2xl'>Prezzi</Text>
        <Center textAlign={'center'} p='4'>
            <Box mb='1' mr='2' w='80px' >
                Giacca
                <Input size='lg' value={prezzi?.giacca} onChange={(e) => setPrezzi({...prezzi, giacca: e.target.value})} />
            </Box>
            <Box mb='1' ml='2' w='80px'>
                Borsa
                <Input size='lg' value={prezzi?.borsa} onChange={(e) => setPrezzi({...prezzi, borsa: e.target.value})} />
            </Box>
        </Center>
        <Button size='lg' isLoading={isLoading} onClick={() => savePrezzi()}>Aggiorna</Button>
    </Container>
  )
}

export default Prezzi