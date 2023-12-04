import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import React from 'react'
import NuovaData from './NuovaData'
import Postazione from './Postazione'
import Tipologie from './Tipologie'
import Stampanti from './Stampanti'

const MyModal = ({isOpen,onClose}) => {

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
            <Postazione onClose={onClose}/>
            <Tipologie />
            <NuovaData onClose={onClose}/>
            <Stampanti onClose={onClose}/>
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MyModal