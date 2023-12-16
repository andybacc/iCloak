import { Heading, FormLabel, Button, Center, Divider, FormControl, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'


import useStore from '../store'

const Venue = ({onClose}) => {
  const { venue, setVenue } = useStore()
    const [nome, setNome] = useState(venue||'')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    function cambiaVenue() {
      setIsLoading(true)
      setVenue(nome)
      toast({ title: 'Nome venue impostato', status: 'success', isClosable: true })
      setTimeout(() => {
        setIsLoading(false)
        onClose()
      }, 500);
    }
    return (
      <>
          <Text fontSize='2xl'>Venue</Text>
          <FormControl px='1'>
            <Input name='venue' placeholder='Nome della location di lavoro' 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} />
          </FormControl>
        <Button size='lg' isLoading={isLoading} onClick={()=>cambiaVenue()}>Aggiorna</Button>
        <Divider my='1'/>
      </>
    )
  }
  
export default Venue