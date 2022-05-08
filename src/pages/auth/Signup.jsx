import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Text,
    Button,
    Link,
    Flex,
    useToast
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {useState} from "react";
import {useAuth} from "context";

export function Signup(){
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        displayName: ""
    });
    const [confirmPass, setConfirmPass] = useState("");
    const toast = useToast();
    const {signUpUser} = useAuth();
    const dummyCredential = {
        email: "test@gmail.com",
        password: "testtest",
        displayName: "Aniket"
    }


    const signupHandler = (e) => {
        e.preventDefault();
        if(credentials.email===""||credentials.password===""||credentials.displayName===""||confirmPass===""){
            toast({
                title: "Some inputs are incomplete",
                status: "warning",
                position: "bottom-right",
                isClosable: true
              })
        }
        else if(credentials.password!==confirmPass){
            toast({
                title: "Passwords don't match",
                status: "warning",
                position: "bottom-right",
                isClosable: true
              })
        }else{
            signUpUser(credentials);
        }
    }

    return (
        <Box as="form" maxW="25rem" p={3} 
        border='2px' borderColor='gray.200' borderRadius="md" 
        mx="auto" my="1rem">
            
            <Text fontSize="3xl" my={3} align="center">Signup</Text>
            
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' placeholder='email' value={credentials.email} 
                onChange={({target})=>setCredentials(prev=>({...prev,email:target.value}))} />

                <FormLabel htmlFor='name'>Display Name</FormLabel>
                <Input id='name' placeholder='name' value={credentials.displayName} 
                onChange={({target})=>setCredentials(prev=>({...prev,displayName:target.value}))} />

                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type="password" placeholder='password' value={credentials.password} 
                onChange={({target})=>setCredentials(prev=>({...prev,password:target.value}))} />

                <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                <Input id='confirm-password' type="password" placeholder='confirm password' value={confirmPass} 
                onChange={({target})=>setConfirmPass(target.value)} />
            </FormControl>

            <Flex alignItems='center' direction="column" mt={2}>                
                <Link as={RouterLink} to="/login">
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='ghost'>
                        Already have an account
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
                    onClick={signupHandler}
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
}