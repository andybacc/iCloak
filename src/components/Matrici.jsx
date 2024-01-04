import { Button, FormControl, FormLabel, Input, HStack, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import apiClient from '../apiClient'
import useStore from '../store'

const Matrici = () => {
    const [inizio, setInizio] = useState(0)
    const [fine, setFine] = useState(0)
    const [lable, setLable] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const { settings } = useStore()

    function stampaMatrici() {
        setIsLoading(true)
        apiClient.post(`/matrici/${inizio}/${fine}?lable=${lable}`, {stampanti: settings?.stampanti})
        .then((r) => {
            toast({ title: 'Matrici stampate', status: 'success', isClosable: true })
            setTimeout(() => {
                setIsLoading(false)
                setFine(0)
                setInizio(0)
                setLable('')
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
        <HStack pb='4'>
        <Input 
            type="text" 
            value={lable}
            onChange={(e) => setLable(e.target.value)}
            placeholder="Etichetta"
        />
        <Input 
            type="number" 
            inputMode="numeric"
            value={inizio>0? inizio : ''}
            onChange={(e) => setInizio(e.target.value)}
            placeholder="Inizio"
            width='120px'
        />
        <Input 
            type="number" 
            inputMode="numeric"
            value={fine>0? fine : ''}
            onChange={(e) => setFine(e.target.value)}
            placeholder="fine"
            width='120px'
        />
        </HStack>
        <Button isDisabled={inizio==0||!inizio&&fine==0||!fine||inizio>=fine} isLoading={isLoading} size='lg' onClick={()=>stampaMatrici()} >Stampa</Button>
    </FormControl>

    </>
  )
}

export default Matrici