import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Date from './pages/Date';
import Emissione from './pages/Emissione';
import useStore from './store';
import { useToast } from "@chakra-ui/react"

function App() {
  const { getRange, fetchDate } = useStore()
  const { dataSel } = useStore()
  const toast = useToast()

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