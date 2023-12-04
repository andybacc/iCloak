import { Container, Button, Flex, useDisclosure, useToast, Switch } from '@chakra-ui/react'
import { BsGearFill } from 'react-icons/bs'

import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Print from '../components/Print'
import Setup from '../components/Setup'
import MenuData from '../components/MenuData'
import apiClient from '../services/apiClient'
import useStore from '../store'

const Emissione = () => {
  const { printer, dataSel, getRange, fetchDate } = useStore()
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
  const { isOpen: isSetupOpen, onOpen: onSetupOpen, onClose: onSetupClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    getRange()
    fetchDate()
    .catch((e) => {
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
    apiClient.post(`/print/` + dataSel, record)
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
        {dataSel && <Button mr='2' variant='solid' onClick={onMenuOpen}>Menu</Button>}
        <Button variant='solid' onClick={onSetupOpen} leftIcon={<BsGearFill />}>Impostazioni</Button>
        
      </Container>
      <Container minW='800px'>
        <Date />
      </Container>
      {dataSel? <Print /> : null}
      <MenuData isOpen={isMenuOpen} onClose={onMenuClose} />
      <Setup isOpen={isSetupOpen} onClose={onSetupClose} />
    </>
  )
}

const Date = () => {
  const { date, dataSel, setDataSel } = useStore()

  return (
    <Flex>
      {date?.map((d,i) => {
        return (<Button mr='2' variant={dataSel==d.id?'solid':'outline'} bgColor={dataSel==d.id?'magenta':null} key={i} data={d.prodotti} onClick={()=>setDataSel(d.id)}>
          {dayjs(d.data).format('DD MMM')}
        </Button>)
      }
      )}
    </Flex>
  )
}
export default Emissione