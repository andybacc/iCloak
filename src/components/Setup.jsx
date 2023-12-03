import { Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'
import React from 'react'
import NuovaData from './NuovaData'
import Postazione from './Postazione'
import Prezzi from './Prezzi'
import Range from './Range'
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
            <Divider my='1'/>
            <Range />
            <Divider my='1'/>
            <Prezzi onClose={onClose}/>
            <Divider my='1'/>
            <NuovaData onClose={onClose}/>
            <Divider my='1'/>
            <Stampanti onClose={onClose}/>
          </VStack>

        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default MyModal