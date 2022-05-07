import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Text,
    Flex,
    Link
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from '@chakra-ui/icons';

export function Login(){
    return (
        <Box as="form" maxW="25rem" p={5} 
        border='2px' borderColor='gray.200' borderRadius="md" 
        mx="auto" my="5rem">
            
            <Text fontSize="3xl" mt={3} align="center">Login</Text>
            
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' placeholder='email' />
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type="password" placeholder='password' />
            </FormControl>
            
            <Flex alignItems='center' direction="column" mt={2}>                
                <Link as={RouterLink} to="/signup" decoration={false}>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='ghost'>
                        Create new account
                    </Button>
                </Link>

                <Button
                    mt={4}
                    colorScheme='teal'
                    type='submit'
                >
                    Submit
                </Button>
            </Flex>
        </Box>
    );
}