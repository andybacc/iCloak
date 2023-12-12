import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from 'react';
import useStore from './store';
import Main from "./pages/Main";

function App() {
  const { getRange } = useStore()

  useEffect(() => {
    getRange()
  }, [])

  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  )
}
export default App;