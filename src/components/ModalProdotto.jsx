import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'
import React from 'react'
import _ from 'lodash'

const MyModal = ({isOpen,onClose}) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default MyModal