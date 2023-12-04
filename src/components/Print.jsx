import { Heading } from '@chakra-ui/layout'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Flex, Input, InputGroup, InputRightElement, ListItem, Spinner, Text, UnorderedList, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/toast'
import dayjs from 'dayjs'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import { GiMonclerJacket } from 'react-icons/gi'
import apiClient from '../services/apiClient'
import useStore from '../store'

function color(type) {
    return (type=='giacca')?'blue.400':'teal.400'
}
const Print = () => {
    const { postazione, dataSel, prezzi, range, stampanti, registro, setRegistro } = useStore()
    const [lastNumG, setLastNumG] = useState(1)
    const [lastNumB, setLastNumB] = useState(1)
    const [isLoading, setIsLoading] = useState({status: true, type: 'numeri'})
    const toast = useToast()

    const Stampa = (num,type,reprint=false) => {
        if (num==0) {
            toast({ title: 'Inserire un numero', status: 'warning', isClosable: true })
            return
        }

        var myRange = (type=='giacca')?range.G:range.B
        if (num<myRange.min) {
            toast({ title: 'Numero inferiore al minimo', status: 'error', isClosable: true })
            return
        }
        if (num>myRange.max) {
            toast({ title: 'Numero superiore al massimo', status: 'error', isClosable: true })
            return
        }
        setIsLoading({status: true, type: type})

        var record = {
            'numero': parseInt(num),
            'loop': 1,
            'type': type,
            'prezzo': prezzi[type],
            'reprint': reprint?1:0,
            'stampanti': stampanti,
            'postazione': postazione
        }

        apiClient.post(`/print/` + dataSel?.id, record)
        .then((r) => {
            var record = {
                numero: num,
                type: type,
                data: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                reprint: reprint?1:0
            }
            setTimeout(() => {
                setRegistro(_.concat(record, registro))
            }, 200);
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
        apiClient.get(`/registro/${dataSel.id}/${postazione}`)
        .then((r) => {
            setRegistro(r.data)
            setIsLoading({status: false, type: ''})
        })
        .catch((e) => {
            setIsLoading({status: false, type: ''})
            toast({ title: e.response.data.error, status: 'error', isClosable: true })
        })
    }, [dataSel] )

    useEffect(() => {
        var giacche = _.find(registro, {type: 'giacca', reprint: 0})
        var borse = _.find(registro, {type: 'borsa', reprint: 0})

        var ultimaGiacca = giacche? giacche.numero+1 : range.G.min
        var ultimaBorsa = borse? borse.numero+1 : range.B.min

        if (ultimaGiacca<range.G.min) ultimaGiacca = range.G.min
        if (ultimaBorsa<range.B.min) ultimaBorsa = range.B.min

        setLastNumG(ultimaGiacca)
        setLastNumB(ultimaBorsa)
        setIsLoading({status: false, type: ''})
    }, [registro,range])

    if (!dataSel) return <Heading>Seleziona una data</Heading>
    return (
        <Container p='4' minW='1000px'>
            <Flex>
                <Modulo type='giacca' num={lastNumG} Stampa={Stampa} isLoading={isLoading} />
                <Modulo type='borsa' num={lastNumB} Stampa={Stampa} isLoading={isLoading} />
                <Registro registro={registro} />
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
        <Card textAlign={'center'} mr='3' minW='400px'>
            <CardHeader bgColor="grey" textTransform='uppercase'>{type}</CardHeader>
            <CardBody >
                <Heading as="h1" fontSize="5rem" p='6'>{(isLoading.status && (isLoading.type==type || isLoading.type=='numeri'))?<Spinner size='xl' /> : num}</Heading>
                <Text size='small' p='1'>prossimo numero</Text>
            </CardBody>
            <CardFooter p='1'>
                <Ristampa num={num} type={type} Stampa={Stampa} isLoading={isLoading} />
            </CardFooter>
        </Card>
        <Button isDisabled={isLoading.status && isLoading.type==type} variant='solid' bgColor={color(type)} w='150px' h='150px' onClick={()=>Stampa(num,type,false)} textTransform='uppercase'>
            {type==='giacca'
            ?<GiMonclerJacket fontSize='5rem' />
            :<FaShoppingBag fontSize='5rem' />
            }
        </Button>
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