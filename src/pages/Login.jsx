import { Box, Button, Center, Container, FormControl, FormLabel, Img, Input, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import apiClient from '../apiClient';
import useStore from '../store';


export default function Login() {
    const [postazione, setPostazione] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { setAuth } = useStore()
    const toast = useToast()

    function isValid() {
        return postazione.includes('iCloak') && password.length >= 3;
    }
    function handleSubmit() {
        setLoading(true)

        apiClient.post(`/login`, { postazione: postazione, password: password })
        .then(function (r) {
            setTimeout(() => {
                setAuth(r.data)
                setLoading(false)
            }, 500)
        })
        .catch(function (e) {
            setLoading(false)
            toast({
                title: "Errore",
                description: e.response?.data?.error?.message || e.message,
                status: "error",
                isClosable: true,
            })     
        })
    }
    return (
        <Center minHeight="100vh">
        <Container>
            <VStack>
                <Img src="./icon-192.png" alt="logo" />
                <FormControl isRequired onSubmit={handleSubmit}>
                    <Box my='3'>
                        <FormLabel>User</FormLabel>
                        <Input type="text" 
                            value={postazione} 
                            name='postazione'
                            id="postazione"
                            onChange={e => setPostazione(e.target.value)}
                        />
                    </Box>
                    <Box my='3'>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={password}
                            name='password'
                            id='password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Box>
                    <Center>
                        <Button colorScheme='purple' size='lg' my='3' isLoading={loading} isDisabled={!isValid()} onClick={handleSubmit}>
                            Login
                        </Button>
                    </Center>
                </FormControl>
                <Box>
                    <Text as="p" size="xs">iCloak®</Text>
                </Box>
            </VStack>
        </Container>
        </Center>
    )
}
