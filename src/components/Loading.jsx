import React from 'react'
import { CircularProgress, Center } from '@chakra-ui/react';

const Loading = () => {
  return (
      <Center minHeight="100vh">
          <CircularProgress isIndeterminate color='purple.500' />
      </Center>
  )
}

export default Loading