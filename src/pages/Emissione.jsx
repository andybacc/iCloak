import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { Container } from '@chakra-ui/layout'
import { BsGearFill } from 'react-icons/bs'

import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import MyModal from '../components/Setup'
import Print from '../components/Print'
import apiClient from '../services/apiClient'
import dayjs from 'dayjs'
import useStore from '../store'

const Emissione = () => {
  const { setDate, dataSel } = useStore()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    apiClient.get(`/date/1`)
    .then((r) => {
      setDate(r.data)
    })
    .catch((e) => {
      console.log('error in date')
    })
  }, [])

  return (
    <>
      <Container textAlign={'right'} p='4' minW='800px'>
          <Button variant='solid' onClick={onOpen} leftIcon={<BsGearFill />}>Impostazioni</Button>
      </Container>
      <Container minW='800px'>
        <Date />
      </Container>
      {dataSel? <Print /> : null}
      <MyModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

const Date = () => {
  const { date, dataSel, setDataSel } = useStore()

  return (
    <Flex>
      {date?.map((d,i) => {
        return (<Button variant={dataSel==d.id?'solid':'outline'} bgColor={dataSel==d.id?'magenta':null} key={i} data={d.prodotti} onClick={()=>setDataSel(d.id)}>
          {dayjs(d.data).format('DD MMM')}
        </Button>)
      }
      )}
    </Flex>
  )
}
export default Emissione