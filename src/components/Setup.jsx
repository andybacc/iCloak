import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { BsGearFill } from 'react-icons/bs'
import { version } from '../../package.json'
import Stampanti from './Stampanti'
import Tipologie from './Tipologie'
import Venue from './Venue'

const Setup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button variant='solid' onClick={onOpen} rightIcon={<BsGearFill />}>v{version}</Button>
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Impostazioni</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
            <Venue onClose={onClose}/>
            <Tipologie onClose={onClose}/>
            <Stampanti onClose={onClose}/>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>

  )
}

export default Setup