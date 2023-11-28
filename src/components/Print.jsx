import { Heading } from '@chakra-ui/layout'
import { Box, Text, Button, VStack, Card, Flex, CardBody, CardFooter, CardHeader, Container, Input, InputGroup, InputRightElement, ListItem, SimpleGrid, UnorderedList } from '@chakra-ui/react'
import dayjs from 'dayjs'
import useStore from '../store'

import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

function color(type) {
    return (type=='giacca')?'blue.400':'teal.400'
}
const Print = () => {
    const { dataSel, inizialeG, inizialeB, printer, registro, setRegistro } = useStore()
    const [lastNumG, setLastNumG] = useState(inizialeG)
    const [lastNumB, setLastNumB] = useState(inizialeB)
    const [isLoading, setIsLoading] = useState(false)

    const Stampa = (num,type,reprint) => {
        if (num==0) {
            alert('Inserire un numero valido')
            return
        }
        setIsLoading(true)
        apiClient.post(`/print/` + dataSel,
            { 'numero': parseInt(num), 'loop':1 , 'type':type, 'reprint': reprint, 'venue': printer.venue, 'ip': printer.ip}
        )
        .then((r) => {
            var record = {
                numero: num,
                type: type,
                data: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                reprint: reprint?1:0,
            }
            setRegistro(_.concat(record, registro))
        })
        .catch((e) => {
            console.log(e)
            var record = {
                numero: num,
                type: type,
                data: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                reprint: reprint?1:0,
            }
            setRegistro(_.concat(record, registro))
        })
    }
    useEffect(() => {
        apiClient.get(`/last/` + dataSel)
        .then((r) => {
            setRegistro(r.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }, [dataSel] )

    useEffect(() => {
        var giacche = _.find(registro, {type: 'giacca', reprint: 0})
        var borse = _.find(registro, {type: 'borsa', reprint: 0})
        
        setLastNumG(giacche? giacche.numero+1 : 1)
        setLastNumB(borse? borse.numero+1 : 1)
        setIsLoading(false)
    }, [registro])
return (
    <Container p='4' minW='800px'>
        <Flex>
            <Modulo w='40%' type='giacca' num={lastNumG} Stampa={Stampa} isLoading={isLoading} />
            <Modulo w='40%' type='borsa' num={lastNumB} Stampa={Stampa} isLoading={isLoading} />
            <Registro w='20%' registro={registro} />
        </Flex>

    </Container>
    )
}
const Registro = ({registro}) => {
    return (
        <Box h='75vh' overflow='hidden' >
            <UnorderedList styleType={'none'}>
            {registro.map((i, index) => 
                <ListItem key={index} bgColor={color(i.type)} p='0.5' px='2'>
                    <Box as="small">{i.reprint?'(R)':''} </Box>
                    <Box as="b">{i.numero} </Box>
                    <Box as="small">{dayjs(i.data).format('HH:mm:ss')}</Box>
                </ListItem>
            )}
            </UnorderedList>
        </Box>
    )
}
const Modulo = ({type, num, Stampa, isLoading}) => {
    return (
    <VStack>
        <Card textAlign={'center'} mr='3' >
            <CardHeader bgColor="grey" textTransform='uppercase'>{type}</CardHeader>
            <CardBody >
                <Heading as="h1" fontSize="5rem" p='6'>{num}</Heading>
                <Text size='small' p='1'>prossimo numero</Text>
            </CardBody>
            <CardFooter p='1'>
                <Ristampa num={num} type={type} Stampa={Stampa} isLoading={isLoading} />
            </CardFooter>
        </Card>
        <Button isDisabled={isLoading} variant='solid' bgColor={color(type)} w='150px' h='150px' onClick={()=>Stampa(num,type,false)} textTransform='uppercase'>{type}</Button>
    </VStack>
    )
}
const Ristampa = ({type,Stampa,isLoading}) => {
    const [num, setNum] = useState(0)

    return (
        <InputGroup size='md'>
            <Input
                pr='4.5rem'
                placeholder=' '
                id='numero'
                type='number'
                onChange={(e) => setNum(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button isDisabled={isLoading} bgColor={color(type)} h='1.75rem' size='sm' onClick={()=>Stampa(num,type,true)}>
                    Ristampa
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
export default Print