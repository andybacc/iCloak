import { Button, Container, Flex, useDisclosure, useToast } from '@chakra-ui/react'
import { BsGearFill, BsPerson } from 'react-icons/bs'

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import MenuData from '../components/MenuData'
import Setup from '../components/Setup'
import apiClient from '../services/apiClient'
import NuovaData from '../components/NuovaData'
import useStore from '../store'

const Date = () => {
  const { postazione, printer, dataSel, fetchDate } = useStore()
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
  const { isOpen: isSetupOpen, onOpen: onSetupOpen, onClose: onSetupClose } = useDisclosure()
  const { isOpen: isNDOpen, onOpen: onNDOpen, onClose: onNDClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    fetchDate()
    .catch((e) => {
      console.log(e)
      toast({
          title: e.message,
          status: 'error', 
          isClosable: true
      })
    })
  }, [])

  function printTest() {
    setIsLoading(true)
    var record = {
      'numero': 1,
      'loop': 1,
      'type': 'giacca',
      'reprint': false,
      'printer': printer,
      'test': true
    }
    apiClient.post(`/print/` + dataSel.id, record)
      .then((r) => {
        setIsLoading(false)
        toast({
            title: 'Test di stampa OK',
            status: 'success', 
            isClosable: true
        })
      })
      .catch((e) => {
        setIsLoading(false)
        toast({
            title: e.response.data.error,
            status: 'error', 
            isClosable: true
        })
  })
  }
  return (
    <>
      <Container textAlign={'right'} p='4' minW='800px'>
        {printer?.active && <Button mr='2' isLoading={isLoading} variant='solid' onClick={() => printTest()}>Test</Button>}
          <Button variant='fill' mr='2'><BsPerson />{postazione}</Button>
        {dataSel && <>
          <Button mr='2' variant='solid' onClick={onMenuOpen}>Menu</Button>
        </>}
        <Button variant='solid' onClick={onSetupOpen}><BsGearFill /></Button>
      </Container>
      <Container minW='800px'>
        <Flex>
          <Button mr='2' variant='solid' onClick={onNDOpen}>Nuova data</Button>
          <ListaDate />
        </Flex>
      </Container>
      <MenuData isOpen={isMenuOpen} onClose={onMenuClose} />
      <Setup isOpen={isSetupOpen} onClose={onSetupClose} />
      <NuovaData isOpen={isNDOpen} onClose={onNDClose} />
    </>
  )
}

const ListaDate = () => {
  const { date, dataSel, setDataSel } = useStore()
  
  function goTo(data) {
    setDataSel(data)
  }

  return (
    <>
      {date?.map((d,i) => {
        return (<Button mr='2' variant={dataSel?.id==d.id?'solid':'outline'} bgColor={dataSel?.id==d.id?'magenta':null} key={i} data={d.prodotti} onClick={()=>goTo(d)}>
          {dayjs(d.data).format('DD MMM')}
        </Button>)
      }
      )}
    </>
  )
}
export default Date