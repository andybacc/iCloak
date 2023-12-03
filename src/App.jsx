import React from 'react';
import Emissione from './pages/Emissione';
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Emissione />
    </ChakraProvider>
  )
}
export default App;