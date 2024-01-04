import { Box, Button, Center, Flex, Heading, Img, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import dayjs from 'dayjs'
import _ from 'lodash'
import React, { useRef, useState } from 'react'
import { BsCalendar2DateFill } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { version } from '../../package.json'
import apiClient from '../apiClient'
import useStore from '../store'

const Date = () => {
    const { date, isAdmin, setDataSel } = useStore()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <Center minH='100vh'>
        <VStack>
          <Flex>
            <Img src='./icon-192.png' alt='iCloak' w='200px' />
            <Text as='small'>v{version}</Text>
          </Flex>
        <Heading as='h1' size='lg' mb='4'>Seleziona data di lavoro</Heading>
        {isAdmin && <Button size='lg' my='2rem' variant='solid' onClick={onOpen} leftIcon={<FaPlus />} color={'yellow'}>Nuova data</Button>}
        {date?.map((d,i) => (<Button size='lg' my='0' variant='solid' key={i} data={d.prodotti} 
        onClick={()=>setDataSel(d)}>
            <Box py='3'>
              <Box fontSize='xs'>{dayjs(d.data).format('DD/MM/YYYY')}</Box>
              <Box fontSize='lg'>{d.nome}</Box>
            </Box>
          </Button>)
        )}
        </VStack>
        <NuovaData isOpen={isOpen} onClose={onClose} />
      </Center>
    )
}

const NuovaData = ({isOpen,onClose}) => {
  const [newData, setNewData] = useState('')
  const [nomeData, setNomeData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState({nomeData: false, data: false})
  const { date, setDate } = useStore()
  const toast = useToast()
  const initialRef = useRef(null)

  function createNewDate() {
    if (newData!='' && nomeData!='') {
      setIsLoading(true)
      apiClient.post(`/date`, {data: newData, nome: nomeData})
      .then((r) => {
        var dateNew = date
        dateNew.push(r.data)
        setDate(_.orderBy(dateNew, ['data'], ['desc']))

        toast({ title: 'Data creata', status: 'success', isClosable: true })
        setTimeout(() => {
          setIsLoading(false)
          onClose()
        }, 500);
      })
      .catch((e) => {
        toast({ title: (e.response?.data?.error?.message || e.message), status: 'error', isClosable: true })
        setIsLoading(false)
      })
    } else {
      setIsInvalid({nomeData: nomeData=='', data: newData==''})
      toast({
        title: 'Compila i campi richiesti',
        status: 'error', 
        isClosable: true
      })
    }
  }
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} initialFocusRef={initialRef} >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Nuova Data</ModalHeader>
      <ModalCloseButton />
      <ModalBody textAlign={'center'}>
          <Input id='nomeData'
            placeholder="Dai un nome alla data"
            size="md"
            type="text"
            my='3'
            isInvalid={isInvalid?.nomeData}
            onChange={(e) => setNomeData(e.target.value) }
            ref={initialRef}
          />
        <InputGroup>
          <InputLeftAddon children={<BsCalendar2DateFill />} size='md' />
          <Input id='data'
            placeholder="Scegli data"
            size="md"
            type="date"               
            isInvalid={isInvalid?.data}
            onChange={(e) => setNewData(e.target.value) }
          />
        </InputGroup>
        <Button m='3' size='lg' onClick={()=>createNewDate()} isLoading={isLoading}>Crea</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Date