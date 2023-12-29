import { Button, Container, Flex, Heading, Spacer, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from 'react';
import { BsBuildingsFill, BsChevronLeft, BsGearFill, BsPerson } from 'react-icons/bs';
import { IoMdPrint } from 'react-icons/io';
import apiClient from "../apiClient";
import useStore from "../store";
import Menu from './Menu';
import Setup from './Setup';

const Head = () => {
    const { settings, isAdmin, dataSel, setDataSel, Logout, postazione } = useStore()
    const [isLoading, setIsLoading] = useState(false)
    const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure()
    const { isOpen: isSetupOpen, onOpen: onSetupOpen, onClose: onSetupClose } = useDisclosure()
    // const { isOpen: isNDOpen, onOpen: onNDOpen, onClose: onNDClose } = useDisclosure()
    const toast = useToast()

    function printTest() {
        setIsLoading(true)
        var record = {
          'stampanti': settings.stampanti,
          'venue': settings.venue,
          'test': true
        }
        apiClient.post(`/print/` + dataSel?.id, record)
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
            {isAdmin && <Button variant='fill' color='white' leftIcon={<BsBuildingsFill />}>{settings.venue}</Button> }
            <Button variant='fill' mr='2' color='yellow' leftIcon={<BsPerson />}>{postazione}</Button>
            {dataSel && settings.stampanti?.ricevuta?.active && <Button mr='2' isLoading={isLoading} variant='solid' leftIcon={<IoMdPrint />} onClick={() => printTest()}>Test</Button>}
            {dataSel && <Button mr='2' variant='solid' onClick={onMenuOpen}>Menu</Button> }
            <Button variant='solid' onClick={onSetupOpen} ><BsGearFill /></Button>
            <Button variant='solid' colorScheme='teal' onClick={Logout} ml='2'>Esci</Button>

            <Menu isOpen={isMenuOpen} onClose={onMenuClose} />
            <Setup isOpen={isSetupOpen} onClose={onSetupClose} />
        </Container>
        <Container minW={{base: '100%', md:'755px'}}>
            <Flex>
                <Button onClick={()=>setDataSel(null)} mr='4'><BsChevronLeft /></Button>
                <Heading size='md' pt='2.5'>{dataSel?.nome}</Heading>
                <Spacer />
             </Flex>
        </Container>
      </>
    )
}  
export default Head