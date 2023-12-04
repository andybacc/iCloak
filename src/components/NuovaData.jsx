import { Button, Divider, Input, InputGroup, InputLeftAddon, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCalendar2DateFill } from 'react-icons/bs'
import apiClient from '../services/apiClient'
import useStore from '../store'


const NuovaData = ({onClose}) => {
    const [newData, setNewData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { fetchDate } = useStore()
    const toast = useToast()
  
    function createNewDate() {
      if (newData!='') {
        setIsLoading(true)
        apiClient.post(`/date`, {data: newData})
        .then((r) => {
          toast({ title: 'Data creata con successo', status: 'success', isClosable: true })
          setTimeout(() => {
            fetchDate();
            setIsLoading(false)
            onClose()
          }, 500);
        })
        .catch((e) => {
          toast({
              title: (e?.response?.data ? e.response.data.error : e),
              status: 'error',
              isClosable: true
          })
          setIsLoading(false)
        })
      } else {
        toast({
          title: 'Seleziona una data',
          status: 'error', 
          isClosable: true
      })
  }
    }
    return (
      <>
        <Text fontSize='2xl'>Nuova data</Text>
        <InputGroup>
          <InputLeftAddon children={<BsCalendar2DateFill />} size='md' />
          <Input id='data'
            placeholder="Scegli data"
            size="md"
            type="date" 
            onChange={(e) => setNewData(e.target.value) }
          />
        </InputGroup>
        <Button size='lg' onClick={()=>createNewDate()} isLoading={isLoading}>Crea</Button>
        <Divider my='1'/>
      </>
    )
  }
  
export default NuovaData