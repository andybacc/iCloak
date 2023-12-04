import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Date from './pages/Date';
import Emissione from './pages/Emissione';
import useStore from './store';
import { useToast } from "@chakra-ui/react"

function App() {
  const { getRange, fetchDate } = useStore()
  const toast = useToast()

  useEffect(() => {
    getRange()
  }, [])

  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Date />} />
        <Route path="/:id" element={<Emissione />} />
      </Routes>
    </ChakraProvider>
  )
}
export default App;