import { Button, Divider, Flex, Input, InputGroup, InputLeftAddon, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useStore from '../store'


const Printer = () => {
    const { printer, setPrinter } = useStore()
    const [nome, setNome] = useState(printer?.nome || '')
    const [ip, setIp] = useState(printer?.ip || '')

    function aggiornaPrinter() {
        setPrinter({nome: nome,ip: ip})
    }
  
    return <>
      <Text fontSize='2xl'>Stampante</Text>
      <Flex>
      <InputGroup>
        <InputLeftAddon children='Nome' size='md' />
        <Input id='nomePrinter' placeholder="Nome stampante" size="md" type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <InputLeftAddon children='IP' size='md' />
        <Input id='ipPrinter' placeholder="IP stampante" size="md" type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
      </InputGroup>
      </Flex>
      <Button size='lg' onClick={()=>aggiornaPrinter()}>Aggiorna</Button>
      <Divider my='1'/>
    </>
  }

export default Printer