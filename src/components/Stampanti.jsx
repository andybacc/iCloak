import { Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Switch, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import useStore from '../store'

const Stampanti = ({ onClose }) => {
  const { settings, saveSettings } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isInvalidR, setIsInvalidR] = useState({ nome: false, ip: false })
  const [isInvalidF, setIsInvalidF] = useState({ nome: false, ip: false })

  const [ricevuta, setRicevuta] = useState(settings.stampanti?.ricevuta || { nome: '', ip: '', lang: 'it' })
  const [fiscale, setFiscale] = useState(settings.stampanti?.fiscale || { nome: '', ip: '', lang: 'it' })

  const toast = useToast()

  function aggiornaStampanti() {
    if (ricevuta?.active && (!ricevuta?.nome || !ricevuta?.ip)) {
      toast({ title: 'Inserisci nome e ip', status: 'warning', isClosable: true })
      setIsInvalidR({ ...isInvalidR, nome: !ricevuta.nome, ip: !ricevuta.ip })
      return
    }
    if (fiscale?.active && (!fiscale?.nome || !fiscale?.ip)) {
      toast({ title: 'Inserisci nome e ip', status: 'warning', isClosable: true })
      setIsInvalidF({ ...isInvalidF, nome: !fiscale.nome, ip: !fiscale.ip })
      return
    }
    setIsInvalidR({ nome: false, ip: false })
    setIsInvalidF({ nome: false, ip: false })

    setIsLoading(true)

    saveSettings({ ...settings, 'stampanti': {ricevuta,fiscale}}).then((r) => {
      toast({ title: 'Stampanti impostate', status: 'success', isClosable: true })
      setTimeout(() => {
        setIsLoading(false)
        onClose()
      }, 300)
    }).catch((e) => {
      toast({ title: 'Errore', description: e.message, status: 'error', isClosable: true })
      setIsLoading(false)
    })
  }
  return (
    <>
      <Text fontSize='2xl'>Stampanti</Text>
      <Flex>
        <VStack px='1rem' w='250px'>
          <Flex>
            <FormLabel htmlFor='sendToPrinter' mb='0'>Ricevuta</FormLabel>
            <Switch defaultChecked={ricevuta?.active} colorScheme='teal' id='sendToPrinter' 
            onChange={(e) => setRicevuta({...ricevuta,active: e.target.checked})} />
          </Flex>

          {ricevuta?.active && <>
            <>
              <InputGroup>
                <InputLeftAddon children='Nome' size='md' />
                <Input id='nomePrinter' placeholder="Nome stampante" size="md" type="text"
                  value={ricevuta?.nome}
                  isInvalid={isInvalidR?.nome}
                  onChange={(e) => setRicevuta({...ricevuta, nome: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='IP' size='md' />
                <Input id='ipPrinter' placeholder="IP stampante" size="md" type="text"
                  value={ricevuta?.ip}
                  isInvalid={isInvalidR?.ip}
                  onChange={(e) => setRicevuta({...ricevuta, ip: e.target.value})}
                />
              </InputGroup>
            </>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='langPrinter' mb='0'>Lingua</FormLabel>
              <Select id='langPrinter' placeholder="Seleziona lingua" size="md" 
                onChange={(e) => setRicevuta({...ricevuta, lang: e.target.value})}
                value={ricevuta?.lang}
              >
                <option value='it'>Italiano</option>
                <option value='en'>English</option>
              </Select>
            </FormControl>
          </>}
        </VStack>

        <VStack px='1rem' w='250px'>
          <Flex>
            <FormLabel htmlFor='sendToPrinter' mb='0'>Fiscale</FormLabel>
            <Switch defaultChecked={fiscale?.active} colorScheme='teal' id='sendToPrinter'
            onChange={(e) => {console.log(e.target.value) ; setFiscale({...fiscale, active: e.target.checked })} }/>
            </Flex>

          {fiscale?.active && <>
            <>
              <InputGroup>
                <InputLeftAddon children='Nome' size='md' />
                <Input id='nomePrinter' placeholder="Nome stampante" size="md" type="text"
                  value={fiscale?.nome}
                  isInvalid={isInvalidF?.nome}
                  onChange={(e) => setFiscale({...fiscale, nome: e.target.value})}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='IP' size='md' />
                <Input id='ipFiscale' placeholder="IP fiscale" size="md" type="text"
                  value={fiscale?.ip}
                  isInvalid={isInvalidF?.ip}
                  onChange={(e) => setFiscale({...fiscale, ip: e.target.value})}
                />
              </InputGroup>
            </>
          </>}
        </VStack>

      </Flex>
      <Button size='lg' onClick={() => aggiornaStampanti()} isLoading={isLoading}>Aggiorna</Button>
    </>
  )
}

export default Stampanti