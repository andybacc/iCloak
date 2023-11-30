import {
  Box, Button, Divider,
  HStack,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import useStore from '../store'
import Printer from './Printer'
import Range from './Range'
import NuovaData from './NuovaData'

import _ from 'lodash'

const MyModal = ({isOpen,onClose}) => {
  const { date, setDate, dataSel, registro, setDataSel, delLastNumber, resetNumbers } = useStore()
  const [isLoading, setIsLoading] = useState({status: false, type: ''})
  const [lastNumber, setLastNumber] = useState(null)
  const toast = useToast()

  function resettaNumeri() {
    setIsLoading({status: true, type: 'resetta'})
    apiClient.delete(`/reset/` + dataSel)
    .then((r) => {
        toast({ title: 'Numeri resettati', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            resetNumbers()
            onClose()
        }, 500);
    })
    .catch((e) => {
        setIsLoading({status: false, type: ''})
        toast({ title: (e?.response? e.response.data.error : e.message), status: 'error', isClosable: true })
    })
  }
  function cancellaUltimo() {
    setIsLoading({status: true, type: 'delLast'})

    apiClient.delete(`/last/` + lastNumber.id)
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
        toast({ title: (e?.response? e.response.data.error : e.message), status: 'error', isClosable: true })
    })
  }
  function archiveData() {
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
  useEffect(() => {
    setLastNumber(_.first(registro, 'id'))
  }, [registro])

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
          {dataSel && <HStack>
              <Box w='33%'>
                <Text mb='2'>Archivia data</Text>
                <Button isLoading={isLoading.status&&isLoading.type=='archive'} size='lg' onClick={() => archiveData()} color='yellow'>Archivia</Button>
              </Box>

              <Box w='33%'>
                <Text mb='2'>Elimina ultimo numero</Text>
                <Button isDisabled={!lastNumber} isLoading={isLoading.status&&isLoading.type=='delLast'} size='lg' onClick={() => cancellaUltimo()} color='red'>Elimina</Button>
              </Box>

              <Box w='33%'>
                <Text mb='2'>Resetta tutti i numeri</Text>
                <Button isLoading={isLoading.status&&isLoading.type=='resetta'} size='lg' onClick={() => resettaNumeri()} color='red'>Resetta</Button>
              </Box>
          </HStack>}
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

export default MyModal