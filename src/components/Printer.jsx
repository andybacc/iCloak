import { Button, Divider, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Switch, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import useStore from '../store'

const Printer = ({onClose}) => {
    const { printer, setPrinter } = useStore()
    const [toPrinter, setToPrinter] = useState(printer?.active || false)
    const [isLoading, setIsLoading] = useState(false)
    const [isInvalid, setIsInvalid] = useState({nome: false, ip: false})
    const [nome, setNome] = useState(printer?.nome || '')
    const [ip, setIp] = useState(printer?.ip || '')
    const [lang, setLang] = useState(printer?.lang || 'it')
    const toast = useToast()

    function aggiornaPrinter() {
        if (!nome || !ip) {
            toast({ title: 'Inserisci nome e ip', status: 'warning', isClosable: true })
            setIsInvalid({...isInvalid, nome: !nome, ip: !ip})
            return
        }
        setIsInvalid({nome: false, ip: false})
        setPrinter({nome: nome, ip: ip, lang: lang, active: toPrinter})
        setIsLoading(true)
        setTimeout(() => {
            toast({ title: 'Stampante aggiornata', status: 'success', isClosable: true })
            setIsLoading(false)
            onClose()
        }, 300);
    }

    return <>
      <Text fontSize='2xl'>Stampante</Text>
      <FormControl display='flex' alignItems='center'>
        <FormLabel htmlFor='sentToPrinter' mb='0'>
          Invia alla stampante
        </FormLabel>
        <Switch defaultChecked={toPrinter} colorScheme='teal' id='sentToPrinter' onChange={(e)=>setToPrinter(!toPrinter)}/>
      </FormControl>

        {toPrinter && <>
        <Flex>
            <InputGroup>
                <InputLeftAddon children='Nome' size='md' />
                <Input id='nomePrinter' placeholder="Nome stampante" size="md" type="text" 
                value={nome}
                isInvalid={isInvalid?.nome}
                onChange={(e) => setNome(e.target.value)}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftAddon children='IP' size='md' />
                <Input id='ipPrinter' placeholder="IP stampante" size="md" type="text"
                value={ip}
                isInvalid={isInvalid?.ip}
                onChange={(e) => setIp(e.target.value)}
                />
            </InputGroup>
        </Flex>
        <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='langPrinter' mb='0'>Lingua</FormLabel>
            <Select id='langPrinter' placeholder="Seleziona lingua" size="md" onChange={(e)=>setLang(e.target.value)}>
                <option value='it'>Italiano</option>
                <option value='en'>English</option>
            </Select>
        </FormControl>
        </>}
        <Button size='lg' onClick={()=>aggiornaPrinter()} isLoading={isLoading}>Aggiorna</Button>
      <Divider my='1'/>
    </>
  }
  

export default Printer