import { Button, Container, Flex, Heading, Spacer, useDisclosure, useToast } from '@chakra-ui/react'
import { BsGearFill, BsPerson } from 'react-icons/bs'

import React, { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { IoMdPrint } from 'react-icons/io'
import MenuData from '../components/MenuData'
import NuovaData from '../components/NuovaData'
import Print from '../components/Print'
import Setup from '../components/Setup'
import apiClient from '../services/apiClient'
import useStore from '../store'

const Emissione = () => {
  const { dataSel, postazione, stampanti, setDataSel } = useStore()
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
  const { isOpen: isSetupOpen, onOpen: onSetupOpen, onClose: onSetupClose } = useDisclosure()
  const { isOpen: isNDOpen, onOpen: onNDOpen, onClose: onNDClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
 
  useEffect(() => {
    apiClient.get(`/data/` + dataSel.id)
      .then((r) => {
        setDataSel(r.data)
      })
      .catch((e) => {
        toast({
            title: e.response.data.error,
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
      'stampanti': stampanti,
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
  
  if (!dataSel) return null
  
  return (
    <>
      <Container p='4' minW='800px'>
        <Flex>
          <>
            <Button onClick={()=>setDataSel(null)} mr='4'><BsChevronLeft /></Button>
            <Heading size='md' pt='2.5'>{dataSel.nome}</Heading>
          </>
          <Spacer />
          <>
            {stampanti?.ricevuta?.active && <Button mr='2' isLoading={isLoading} variant='solid' leftIcon={<IoMdPrint />} onClick={() => printTest()}>Test</Button>}
            <Button variant='fill' mr='2' color='yellow'><BsPerson />{postazione}</Button>
            {dataSel && <Button mr='2' variant='solid' onClick={onMenuOpen}>Menu</Button> }
            <Button variant='solid' onClick={onSetupOpen} ><BsGearFill /></Button>
          </>
        </Flex>
      </Container>
      {dataSel? <Print /> : null}
      <MenuData isOpen={isMenuOpen} onClose={onMenuClose} />
      <Setup isOpen={isSetupOpen} onClose={onSetupClose} />
      <NuovaData isOpen={isNDOpen} onClose={onNDClose} />
    </>
  )
}

export default Emissione