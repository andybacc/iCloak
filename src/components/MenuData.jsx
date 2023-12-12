import {
  Box, Button,
  Divider,
  FormControl,
  HStack,
  Input,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,
  Text,
  VStack
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import useStore from '../store'

const MyModal = ({isOpen,onClose}) => {
  const { date, setDate, dataSel, registro, setDataSel, delLastNumber, resetNumbers } = useStore()
  const [isLoading, setIsLoading] = useState({status: false, type: ''})
  const [nomeData, setNomeData] = useState('')
  const [lastNumber, setLastNumber] = useState(null)
  const toast = useToast()

  useEffect(() => {
    setNomeData(dataSel?.nome)
  }, [dataSel])

  function aggiornaNome() {
    setIsLoading({status: true, type: 'aggiornaNome'})
    apiClient.put(`/data/` + dataSel.id, {nome: nomeData})
    .then((r) => {
        var tmp = dataSel
        tmp.nome = nomeData
        var tmpDate = date
        tmpDate[_.findIndex(tmpDate, {id: dataSel.id})] = tmp
        setDate(tmpDate)
        setDataSel(tmp)

        toast({ title: 'Nome data aggiornato', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            onClose()
        }, 500);
    })
    .catch((e) => {
        setIsLoading({status: false, type: ''})
        toast({ title: (e?.response? e.response.data.error : e.message), status: 'error', isClosable: true })
    })
  }
  function resettaNumeri() {
    setIsLoading({status: true, type: 'resetta'})
    apiClient.delete(`/reset/` + dataSel.id)
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
    apiClient.put(`/archive/` + dataSel.id)
    .then((r) => {
        toast({ title: 'Data ' + dataSel.nome + ' archiviata', status: 'success', isClosable: true })
        setTimeout(() => {
            setIsLoading({status: false, type: ''})
            setDate(_.reject(date, {id: dataSel.id}))
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
        <ModalHeader>Menu data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
            <FormControl>
              <Text mb='2'>Nome data</Text>
              <Input id='nomeData' 
                placeholder='Dai un nome alla data'
                value={nomeData}
                onChange={(e) => setNomeData(e.target.value)}
              />
              <Button my='3'
                isLoading={isLoading.status&&isLoading.type=='aggiornaNome'}
                onClick={()=>aggiornaNome()}>Aggiorna</Button>
            </FormControl>
          <Divider my='3'/>
          <HStack>
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
          </HStack>
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MyModal