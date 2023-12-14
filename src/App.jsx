import { ChakraProvider } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import Loading from "./components/Loading";
import Login from "./pages/Login";
import Main from "./pages/Main";
import useStore from './store';

function App() {
  const { token, isLogged, getRange } = useStore()
  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    getRange()
  }, [])

  useEffect(() => {
    if (token) {
      apiClient.get(`/me`)
      .then(function (r) {
          setAuth(r.data)
          setIsInit(true)
          toast({
              title: "Login effettuato",
              description: "Benvenuto " + r.data.postazione,
              status: "success",
              isClosable: true,
          })
      })
      .catch(function (e) {
          setAuth({token: null})
          toast({
              title: "Errore",
              description: e.message,
              status: "error",
              isClosable: true,
          })
      })
    }
    else {
      setIsInit(true)
    }
  }, [token])

  if (!isInit) return <Loading />
  return (
    <ChakraProvider>
      {isLogged? <Main /> : <Login />}
    </ChakraProvider>
  )
}
export default App;