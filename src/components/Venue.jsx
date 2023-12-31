import { Heading, FormLabel, Button, Center, Divider, FormControl, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'


import useStore from '../store'

const Venue = ({onClose}) => {
  const { settings, saveSettings } = useStore()
    const [nome, setNome] = useState(settings.venue||'')
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    function cambiaVenue() {
      setIsLoading(true)
      saveSettings({ ...settings, venue: nome}).then((r) => {
        toast({ title: 'Nome venue impostato', status: 'success', isClosable: true })
        setTimeout(() => {
          setIsLoading(false)
          onClose()
        }, 500);
      }).catch((e) => {
        toast({ title: 'Errore', description: e.message, status: 'error', isClosable: true })
        setIsLoading(false)
      })
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