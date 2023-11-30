import {
  Flex, Box, Button, Divider, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, HStack, VStack
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import React, { useState } from 'react'
import { BsCalendar2DateFill } from 'react-icons/bs'
import apiClient from '../services/apiClient'
import useStore from '../store'
import Range from './Range'
import _ from 'lodash'

const MyModal = ({isOpen,onClose}) => {
  const { date, setDate, dataSel, setDataSel, delLastNumber, resetNumbers } = useStore()
  const [isLoading, setIsLoading] = useState({status: false, type: ''})
  const toast = useToast()

  function resettaNumeri(dataSel) {
    setIsLoading({status: true, type: 'resetta'})
    apiClient.delete(`/reset/` + dataSel)
    .then((r) => {
        toast({ title: 'Numeri resettati', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            resetNumbers(dataSel)
            onClose()
        }, 500);
    })
    .catch((e) => {
        setIsLoading({status: false, type: ''})
        toast({ title: (e?.response?.data ? e.response.data.error : e), status: 'error', isClosable: true })
    })
  }
  function cancellaUltimo() {
    setIsLoading({status: true, type: 'delLast'})
    var lastNumber = _.last(_.sortBy(date, 'id'))

    apiClient.delete(`/numeri/` + lastNumber)
    .then((r) => {
        toast({ title: 'Ultimo numero cancellato', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            delLastNumber()
            onClose()
        }, 500);
    })
    .catch((e) => {
        setIsLoading({status: false, type: ''})
        toast({ title: (e?.response?.data ? e.response.data.error : e), status: 'error', isClosable: true })
    })
  }
  function archiveData(dataSel) {
    setIsLoading({status: true, type: 'archive'})
    apiClient.put(`/archive/` + dataSel)
    .then((r) => {
        toast({ title: 'Data archiviata', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            setDate(_.reject(date, {id: dataSel}))
            setDataSel(null)
            onClose()
        }, 500);
    })
    .catch((e) => {
        setIsLoading({status: false, type: ''})
        toast({ title: (e?.response?.data ? e.response.data.error : e), status: 'error', isClosable: true })
    })
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
          {dataSel && <HStack>
            <Box>
              <Text mb='2'>Archivia data</Text>
              <Button isLoading={isLoading.status&&isLoading.type=='archive'} size='lg' onClick={() => archiveData(dataSel)} color='yellow'>Archivia</Button>
            </Box>

            <Box>
              <Text mb='2'>Elimina ultimo numero</Text>
              <Button isLoading={isLoading.status&&isLoading.type=='delLast'} size='lg' onClick={() => cancellaUltimo()} color='red'>Elimina</Button>
            </Box>

            <Box>
              <Text mb='2'>Resetta tutti i numeri</Text>
              <Button isLoading={isLoading.status&&isLoading.type=='resetta'} size='lg' onClick={() => resettaNumeri(dataSel)} color='red'>Resetta</Button>
            </Box>
            </HStack>
            }
            <Divider my='1'/>
            <Range />
            <Divider my='1'/>
            <NuovaData onClose={onClose}/>
            <Printer onClose={onClose} />
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

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

const Printer = ({onClose}) => {
  const { printer, setPrinter } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [nome, setNome] = useState(printer?.nome || '')
  const [ip, setIp] = useState(printer?.ip || '')

  function aggiornaPrinter() {
      setPrinter({nome: nome,ip: ip})
      setIsLoading(true)
      setTimeout(() => {
          onClose()
      }, 500);
  }

  return <>
    <Text fontSize='2xl'>Stampante</Text>
    <Flex>
    <InputGroup>
      <InputLeftAddon children='Nome' size='md' />
      <Input id='nomePrinter' placeholder="Nome stampante" size="md" type="text" 
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
    </InputGroup>
    <InputGroup>
      <InputLeftAddon children='IP' size='md' />
      <Input id='ipPrinter' placeholder="IP stampante" size="md" type="text"
        value={ip}
        onChange={(e) => setIp(e.target.value)}
      />
    </InputGroup>
    </Flex>
    <Button size='lg' onClick={()=>aggiornaPrinter()} isLoading={isLoading}>Aggiorna</Button>
    <Divider my='1'/>
  </>
}

export default MyModal