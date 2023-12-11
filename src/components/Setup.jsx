import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import React from 'react'
import Postazione from './Postazione'
import Stampanti from './Stampanti'
import Tipologie from './Tipologie'

const Setup = ({isOpen,onClose}) => {

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='xl' >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Impostazioni</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack textAlign='center'>
            <Postazione onClose={onClose}/>
            <Tipologie  onClose={onClose}/>
            <Stampanti onClose={onClose}/>
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Setup