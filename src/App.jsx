import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Date from './pages/Date';
import Emissione from './pages/Emissione';
import useStore from './store';

function App() {
  const { getRange } = useStore()
  const { dataSel } = useStore()

  useEffect(() => {
    getRange()
  }, [])

  return (
    <ChakraProvider>
      {dataSel? <Emissione /> : <Date />}
    </ChakraProvider>
  )
}
export default App;