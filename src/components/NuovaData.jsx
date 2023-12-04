import { Button, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsCalendar2DateFill } from 'react-icons/bs'
import apiClient from '../services/apiClient'
import useStore from '../store'

const NuovaData = ({isOpen,onClose}) => {
    const [newData, setNewData] = useState('')
    const [nomeData, setNomeData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { fetchDate } = useStore()
    const toast = useToast()
  
    function createNewDate() {
      if (newData!='' && nomeData!='') {
        setIsLoading(true)
        apiClient.post(`/date`, {data: newData, nome: nomeData})
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
          title: (nomeData=='Dai un nome alla serata'?'':'Seleziona data'),
          status: 'error', 
          isClosable: true
      })
  }
    }
    return (
      <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuova Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody textAlign={'center'}>
            <Input id='nomeData'
              placeholder="Dai un titolo alla data"
              size="md"
              type="text"
              my='3'
              onChange={(e) => setNomeData(e.target.value) }
            />
          <InputGroup>
            <InputLeftAddon children={<BsCalendar2DateFill />} size='md' />
            <Input id='data'
              placeholder="Scegli data"
              size="md"
              type="date" 
              onChange={(e) => setNewData(e.target.value) }
            />
          </InputGroup>
          <Button m='3' size='lg' onClick={()=>createNewDate()} isLoading={isLoading}>Crea</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  
export default NuovaData