import { Button, FormControl, Input, Text, Divider, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import useStore from '../store'


const Postazione = ({onClose}) => {
  const { postazione, setPostazione } = useStore()
  const [isLoading, setLoading] = useState(false)
  const [postaz, setPostaz] = useState(postazione || '')
  const toast = useToast()

  function salvaPostazione() {
    setLoading(true)
    toast({
      title: 'Postazione impostata',
      status: 'success',
      isClosable: true
    })
    setTimeout(() => {
      setPostazione(postaz)
      setLoading(false)
      onClose()
    }, 300);
  }
  return (
    <>
      <Text fontSize='2xl'>Nome postazione</Text>
      <FormControl>
        <Input placeholder='Nome postazione' size='lg' 
          value={postaz}
          onChange={(e) => setPostaz(e.target.value)}
        />
      </FormControl>
      <Button size='lg' mt='2' isLoading={isLoading} onClick={()=>salvaPostazione()}>Aggiorna</Button>
      <Divider my='1'/>
    </>
    )
}

export default Postazione