import {
  Box, Button, Card, CardBody, Center, Divider, FormControl, Input, InputLeftAddon, Modal,
  ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput,
  NumberInputField, Text, VStack, InputGroup
} from '@chakra-ui/react'
import React from 'react'
import { BsCalendar2DateFill } from 'react-icons/bs'
import apiClient from '../services/apiClient'
import useStore from '../store'
import Printer from './Printer'
import Iniziali from './Iniziali'

const MyModal = ({isOpen,onClose,dataSel}) => {
  const { inizialeG, inizialeB } = useStore()

  function archiveData(id) {
    apiClient.post('/archive'+id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  function deleteData(id) {
    apiClient.delete('/delete'+id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  function resetData(id) {
    apiClient.post('/reset'+id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
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
          {dataSel && <>
            <Box><Button size='lg' onClick={() => archiveData(dataSel)} color='yellow'>Archivia data</Button></Box>
            <Divider my='1'/>
            <Box>
              <Text mb='2'>Elimina ultimo numero</Text>
              <Button size='lg' onClick={() => deleteData(dataSel)} color='red'>Elimina</Button>
            </Box>
            <Divider my='1'/>
            <Box>
              <Text mb='2'>Resetta tutti i numeri</Text>
              <Button size='lg' onClick={() => resetData(dataSel)} color='red'>Resetta</Button>
            </Box>
            <Divider my='1'/>
            </>
            }
            <Iniziali />
            <Divider my='1'/>
            <>
              <Text fontSize='2xl'>Nuova data</Text>
              <InputGroup>
                <InputLeftAddon children={<BsCalendar2DateFill />} size='md' />
                <Input id='data' placeholder="Select Date and Time" size="md" type="date" />
              </InputGroup>
              <Button size='lg' onClick={()=>nuovaData()}>Crea</Button>
              <Divider my='1'/>
            </>
            <Printer />
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MyModal