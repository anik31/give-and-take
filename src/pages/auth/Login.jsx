import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Text,
    Flex,
    Link,
    useToast
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from 'context';

export function Login(){
    const toast = useToast();
    const {loginUser} = useAuth();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const dummyCredential = {
        email: "test@gmail.com",
        password: "testtest"
    }

    const loginHandler = (e) => {
        e.preventDefault();
        if(credentials.email===""||credentials.password===""){
            toast({
                title: "Some inputs are incomplete",
                status: "warning",
                position: "bottom-right",
                isClosable: true
              })
        }else{
            loginUser(credentials.email,credentials.password);
        }
    }

    return (
        <Box as="form" maxW="25rem" p={5} 
        border='2px' borderColor='gray.200' borderRadius="md" 
        mx="auto" my="5rem">
            
            <Text fontSize="3xl" mt={3} align="center">Login</Text>
            
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' placeholder='email' value={credentials.email} 
                onChange={({target})=>setCredentials(prev=>({...prev,email:target.value}))} />

                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type="password" placeholder='password' value={credentials.password} 
                onChange={({target})=>setCredentials(prev=>({...prev,password:target.value}))} />
            </FormControl>
            
            <Flex alignItems='center' direction="column" mt={2}>                
                <Link as={RouterLink} to="/signup">
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='ghost'>
                        Create new account
                    </Button>
                </Link>
                <Button
                    mt={4}
                    colorScheme='teal'
                    variant="outline"
                    onClick={()=>setCredentials(dummyCredential)}
                >
                    dummyCredential
                </Button>
                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                    onClick={loginHandler}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
}