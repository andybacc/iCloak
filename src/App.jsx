import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import apiClient from "./apiClient";
import Loading from "./components/Loading";
import Date from "./pages/Date";
import Login from "./pages/Login";
import Main from "./pages/Main";
import useStore from './store';

function App() {
  const { dataSel, token, isLogged, setAuth } = useStore()
  const [isInit, setIsInit] = useState(false)
  const toast = useToast()

  useEffect(() => {
    if (token) {
      apiClient.get(`/me`)
      .then(function (r) {
        setAuth(r.data)
        toast({
            title: "Login effettuato",
            description: "Benvenuto " + r.data.postazione,
            status: "success",
            isClosable: true,
        })
        setTimeout(() => setIsInit(true), 500)
      })
      .catch(function (e) {
          setAuth({token: null})
          setIsInit(true)
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

  if (!isLogged) return <Login />

  return (
    <>
      {dataSel? <Main /> : <Date />}
    </>
  )
}
export default App;