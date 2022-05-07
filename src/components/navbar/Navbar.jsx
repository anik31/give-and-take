import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Wrap, WrapItem, Link, Button, Text } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';

export function Navbar(){
    return ( 
        <Box as="nav" display="flex" alignItems="center" justifyContent="space-between" 
            px={10} py={3} pos="sticky" top={0} w="100%"
            backdropFilter='auto' backdropBlur='7px' 
            borderBottom='1px' borderColor='gray.200'
        >

            <Link as={RouterLink} to="/">
                <Text fontSize="2xl">Give&Take</Text>
            </Link>

            <Wrap>
                <WrapItem display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <Avatar size='sm' name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                    <Link fontSize='1rem' as={RouterLink} to="/profile">Hello, User</Link>
                </WrapItem>
                
                <WrapItem>
                    <Button variant='ghost'><MoonIcon w={5} h={5} color='gray.500' /></Button>
                </WrapItem>
            </Wrap>
        </Box>
    );
};

