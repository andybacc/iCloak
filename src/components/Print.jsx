import { Heading } from '@chakra-ui/layout'
import { Button, Card, CardBody, CardFooter, CardHeader, Container, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient'
import _ from 'lodash'


const Print = ({dataSel}) => {
    const [lastNumG, setLastNumG] = useState(1)
    const [lastNumB, setLastNumB] = useState(1)

    useEffect(() => {
        apiClient.get(`/last/` + dataSel)
        .then((r) => {
            var giacche = _.filter(r.data, {type: 'giacca'})
            var borse = _.filter(r.data, {type: 'borsa'})

            if (giacche) setLastNumG(giacche[0].numero+1)
            if (borse) setLastNumB(borse[0].numero+1)
        })
        .catch((e) => {
          console.log(e)
        })
    }, [dataSel] )
    return (
        <Container p='4'>
        <SimpleGrid columns={2} spacing={5} >
            <Card textAlign={'center'}>
                <CardHeader>Giacca</CardHeader>
                <CardBody>
                <Heading as="h1" size="xl">{lastNumG}</Heading>
                </CardBody>
                <CardFooter>
                    <Button variant='outline'>Ristampa</Button>
                </CardFooter>
            </Card>
            <Card textAlign={'center'}>
                <CardHeader>BORSA</CardHeader>
                <CardBody>
                    <Heading as="h1" size="xl">{lastNumB}</Heading>
                </CardBody>
                <CardFooter>
                    <Button variant='outline'>Ristampa</Button>
                </CardFooter>
            </Card>
        </SimpleGrid>
        </Container>
    )
}

export default Print