import {
    FormControl,
    FormLabel,
    Input,
    Box,
    Text,
    Button,
    Link,
    Flex
} from '@chakra-ui/react';
import { Link as RouterLink } from "react-router-dom";
import { ArrowForwardIcon } from '@chakra-ui/icons';

export function Signup(){
    return (
        <Box as="form" maxW="25rem" p={5} 
        border='2px' borderColor='gray.200' borderRadius="md" 
        mx="auto" my="5rem">
            
            <Text fontSize="3xl" my={3} align="center">Signup</Text>
            
            <FormControl isRequired>
                <FormLabel htmlFor='email'>Email address</FormLabel>
                <Input id='email' type='email' placeholder='email' />
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' type="password" placeholder='password' />
                <FormLabel htmlFor='confirm-password'>Confirm Password</FormLabel>
                <Input id='confirm-password' type="password" placeholder='confirm password' />
            </FormControl>

            <Flex alignItems='center' direction="column" mt={2}>                
                <Link as={RouterLink} to="/login" decoration={false}>
                    <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='ghost'>
                        Already have an account
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