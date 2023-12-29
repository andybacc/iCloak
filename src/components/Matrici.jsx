import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import apiClient from '../apiClient'
import useStore from '../store'

const Matrici = () => {
    const [inizio, setInizio] = useState(0)
    const [fine, setFine] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const { settings } = useStore()

    function stampaMatrici() {
        setIsLoading(true)
        apiClient.post(`/matrici/${inizio}/${fine}`, {stampanti: settings?.stampanti})
        .then((r) => {
            toast({ title: 'Matrici stampate', status: 'success', isClosable: true })
            setTimeout(() => {
                setIsLoading(false)
                setFine(0)
                setInizio(0)
            }, 1000);
        })
        .catch((e) => {
            toast({ title: (e?.response? e.response.data.error : e.message), status: 'error', isClosable: true })
            setTimeout(() => {
                setIsLoading(false)
            }, 1000);
        })
    }
  return (
    <>
    <FormControl id="matrice">
        <FormLabel>Stampa matrici</FormLabel>
        <VStack pb='4'>
        <Input 
            type="number" 
            inputMode="numeric"
            value={inizio>0? inizio : ''}
            onChange={(e) => setInizio(e.target.value)}
            placeholder="Numero iniziale"
        />
        <Input 
            type="number" 
            inputMode="numeric"
            value={fine>0? fine : ''}
            onChange={(e) => setFine(e.target.value)}
            placeholder="Numero finale"
        />
        </VStack>
        <Button isDisabled={inizio==0||!inizio&&fine==0||!fine||inizio>=fine} isLoading={isLoading} size='lg' onClick={()=>stampaMatrici()} >Stampa</Button>
    </FormControl>

    </>
  )
}

export default Matrici