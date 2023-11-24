import { Heading } from '@chakra-ui/layout'
import { Box, Button, VStack, Card, Flex, CardBody, CardFooter, CardHeader, Container, Input, InputGroup, InputRightElement, ListItem, SimpleGrid, UnorderedList } from '@chakra-ui/react'
import dayjs from 'dayjs'

import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'


const Print = ({dataSel}) => {
    const [log, setLog] = useState([])
    const [lastNumG, setLastNumG] = useState(1)
    const [lastNumB, setLastNumB] = useState(1)

    useEffect(() => {
        apiClient.get(`/last/` + dataSel)
        .then((r) => {
            setLog(r.data)
            var giacche = _.filter(r.data, {type: 'giacca'})
            var borse = _.filter(r.data, {type: 'borsa'})

            setLastNumG(giacche.length>0? giacche[0].numero+1 : 1)
            setLastNumB(borse.length>0? borse[0].numero+1 : 1)
        })
        .catch((e) => {
          console.log(e)
        })
    }, [dataSel] )
    return (
    <Container p='4' minW='800px'>
        <Flex>
            <Modulo w='40%' type='GIACCA' num={lastNumG} />
            <Modulo w='40%' type='BORSA' num={lastNumB} />
            <Log w='20%' log={log} />
        </Flex>

    </Container>
    )
}
const Log = ({log}) => {
    return (
        <UnorderedList styleType={'none'} >
        {log.map((item, index) => 
            <ListItem key={index} ><Box as="b">{item.numero}</Box> <Box as="small">{dayjs(item.data).format('HH:mm:ss')}</Box></ListItem>
        )}
        </UnorderedList>
    )
}
const Modulo = ({type, num}) => {
    return (
    <VStack>
        <Card textAlign={'center'} mr='3' h='300px'>
            <CardHeader bgColor="grey">{type}</CardHeader>
            <CardBody >
                <Heading as="h1" fontSize="5rem" p='6'>{num}</Heading>
            </CardBody>
            <CardFooter p='1'>
                <Ristampa num={num}/>
            </CardFooter>
        </Card>
        <Button variant='solid' bgColor={(type=='GIACCA')?'teal':'magenta'} w='150px' h='150px' onClick={()=>Stampa(num)}>{type}</Button>
    </VStack>
    )
}
const Ristampa = ({num}) => {
    useEffect(() => {

    }, [num] )

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                placeholder=' '
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={()=>Ristampa(this.value)}>
                    Ristampa
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
export default Print