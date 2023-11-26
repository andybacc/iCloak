import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { Container } from '@chakra-ui/layout'
import { BsGearFill } from 'react-icons/bs'

import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import MyModal from '../components/Setup'
import Print from '../components/Print'
import apiClient from '../services/apiClient'
import dayjs from 'dayjs'

const Emissione = () => {
  const [date, setDate] = useState([])
  const [dataSel, setDataSel] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    apiClient.get(`/date/1`)
    .then((r) => {
      setDate(r.data)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <>
      <Container textAlign={'right'} p='4' minW='800px'>
          <Button variant='solid' onClick={onOpen} leftIcon={<BsGearFill />}>Impostazioni</Button>
      </Container>
      <Container minW='800px'>
        <Date date={date} dataSel={dataSel} setDataSel={setDataSel} />
      </Container>
      {dataSel? <Print dataSel={dataSel} /> : null}
      <MyModal isOpen={isOpen} onClose={onClose} dataSel={dataSel} />
    </>
  )
}

const Date = ({dataSel,date,setDataSel}) => {
  return (
    <Flex>
      {_.map(date, (d,i) => {
        return (<Button variant={dataSel==d.id?'solid':'outline'} bgColor={dataSel==d.id?'magenta':null} key={i} data={d.prodotti} onClick={()=>setDataSel(d.id)}>
          {dayjs(d.data).format('DD MMM')}
        </Button>)
      }
      )}
    </Flex>
  )
}
export default Emissione