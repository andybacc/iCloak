import { Img, Center } from '@chakra-ui/react'
import React from 'react'
import Head from '../components/Head'
import Print from '../components/Print'
import useStore from '../store'

const Main = () => {
  const { dataSel } = useStore()
   
  return (
    <>
      <Head />
      {dataSel
        ? <Print />
        : <Center minH='80vh'><Img src="./icon-192.png" alt="iGuardaroba" /></Center>
      }
    </>
  )
}

export default Main