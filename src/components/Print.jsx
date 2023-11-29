import { Heading } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Input, InputGroup, InputRightElement, ListItem, Spinner, Text, UnorderedList, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import useStore from '../store'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'

function color(type) {
    return (type=='giacca')?'blue.400':'teal.400'
}
const Print = () => {
    const { dataSel, iniziali, printer, registro, setRegistro } = useStore()
    const [lastNumG, setLastNumG] = useState(iniziali?.G)
    const [lastNumB, setLastNumB] = useState(iniziali?.B)
    const [isLoading, setIsLoading] = useState({status: false, type: ''})
    const toast = useToast()

    const Stampa = (num,type,reprint) => {
        if (num==0) {
            toast({ title: 'Inserire un numero', status: 'error', isClosable: true })
            return
        }
        if (printer.ip=='') {
            toast({ title: 'Selezionare una stampante', status: 'error', isClosable: true })
            return
        }
        var min = (type=='giacca')?iniziali.G:iniziali.B
        if (num<min) {
            toast({ title: 'Numero inferiore a quello iniziale', status: 'error', isClosable: true })
            return
        }
        setIsLoading({status: true, type: type})

        var record = {
            'numero': parseInt(num),
            'loop': 1,
            'type':type,
            'reprint': reprint,
            'venue': printer.nome,
            'ip': printer.ip
        }

        apiClient.post(`/print/` + dataSel, record)
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
            setIsLoading({status: false, type: ''})
            toast({
                title: e.response.data.error,
                status: 'error', 
                isClosable: true
            })
        })
    }
    useEffect(() => {
        apiClient.get(`/last/` + dataSel)
        .then((r) => {
            setRegistro(r.data)
        })
        .catch((e) => {
            toast({ title: e.response.data.error, status: 'error', isClosable: true })
        })
    }, [dataSel] )

    useEffect(() => {
        var giacche = _.find(registro, {type: 'giacca', reprint: 0})
        var borse = _.find(registro, {type: 'borsa', reprint: 0})
        
        setLastNumG(giacche? giacche.numero+1 : iniziali.G)
        setLastNumB(borse? borse.numero+1 : iniziali.B)
        setIsLoading({status: false, type: ''})
    }, [registro,iniziali])

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
                <Heading as="h1" fontSize="5rem" p='6'>{isLoading.status && isLoading.type==type?<Spinner size='xl' />:num}</Heading>
                <Text size='small' p='1'>prossimo numero</Text>
            </CardBody>
            <CardFooter p='1'>
                <Ristampa num={num} type={type} Stampa={Stampa} isLoading={isLoading} />
            </CardFooter>
        </Card>
        <Button isDisabled={isLoading.status && isLoading.type==type} variant='solid' bgColor={color(type)} w='150px' h='150px' onClick={()=>Stampa(num,type,false)} textTransform='uppercase'>{type}</Button>
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
                <Button isDisabled={isLoading.status && isLoading.type==type} bgColor={color(type)} h='1.75rem' size='sm' onClick={()=>Stampa(num,type,true)}>
                    Ristampa
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}
export default Print