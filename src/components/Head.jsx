import { Box, Container, Heading } from "@chakra-ui/layout";
import { Button, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { BsChevronLeft, BsGearFill, BsPerson } from 'react-icons/bs';
import { FaPlus } from "react-icons/fa";
import { IoMdPrint } from 'react-icons/io';
import apiClient from "../services/apiClient";
import useStore from "../store";
import MenuData from './MenuData';
import NuovaData from './NuovaData';
import Setup from './Setup';

const Head = () => {
    const { dataSel, setDataSel, postazione, stampanti, fetchDate } = useStore()
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
    const { isOpen: isSetupOpen, onOpen: onSetupOpen, onClose: onSetupClose } = useDisclosure()
    const { isOpen: isNDOpen, onOpen: onNDOpen, onClose: onNDClose } = useDisclosure()
    const toast = useToast()

    useEffect(() => {
        fetchDate().catch((e) => {
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
    
    return (
        <>        
        <Container textAlign={'right'} p='4' minW={{base: '100%', md:'755px'}}>
            {dataSel && stampanti?.ricevuta?.active && <Button mr='2' isLoading={isLoading} variant='solid' leftIcon={<IoMdPrint />} onClick={() => printTest()}>Test</Button>}
            <Button variant='fill' mr='2' color='yellow'><BsPerson />{postazione}</Button>
            {dataSel && <Button mr='2' variant='solid' onClick={onMenuOpen}>Menu</Button> }
            <Button variant='solid' onClick={onSetupOpen} ><BsGearFill /></Button>

            <MenuData isOpen={isMenuOpen} onClose={onMenuClose} />
            <Setup isOpen={isSetupOpen} onClose={onSetupClose} />
            <NuovaData isOpen={isNDOpen} onClose={onNDClose} />
        </Container>

        <Container minW={{base: '100%', md:'755px'}}>
            {dataSel
            ? <Flex>
                <Button onClick={()=>setDataSel(null)} mr='4'><BsChevronLeft /></Button>
                <Heading size='md' pt='2.5'>{dataSel?.nome}</Heading>
             </Flex>
            :<Flex>
                <Button mr='2' variant='solid' onClick={onNDOpen} leftIcon={<FaPlus />} color={'yellow'}>Nuova data</Button>
                <ListaDate />
            </Flex>}
        </Container>
      </>
    )
}
const ListaDate = () => {
    const { date, setDataSel } = useStore()
    
    return (
      <>
        {date?.map((d,i) => {
          return (<Button mr='2' key={i} data={d.prodotti} onClick={()=>setDataSel(d)}>
            <Box my='3' py='3'>
              <Box fontSize='xs' >{dayjs(d.data).format('DD/MM/YYYY')}</Box>
              <Box fontSize='lg' >{d.nome}</Box>
            </Box>
          </Button>)
        }
        )}
      </>
    )
  }
  
export default Head