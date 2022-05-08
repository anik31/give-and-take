import { Link as RouterLink } from "react-router-dom";
import { Avatar, Box, Wrap, WrapItem, Link, Button, Text } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';
import { useAuth } from "context";

export function Navbar(){
    const {isLoggedIn, user} = useAuth();

    return ( 
        <Box as="nav" display="flex" alignItems="center" justifyContent="space-between" 
            px={10} py={3} pos="sticky" top={0} w="100%" zIndex="sticky"
            backdropFilter='auto' backdropBlur='7px' 
            borderBottom='1px' borderColor='gray.200'
        >

            <Link as={RouterLink} to="/">
                <Text fontSize="2xl">Give&Take</Text>
            </Link>

            <Wrap>
                {isLoggedIn && <WrapItem display="flex" alignItems="center" justifyContent="center" gap={2}>
                    <Avatar size='sm' name={user.displayName} />
                    <Link fontSize='1rem' as={RouterLink} to="/profile">Hello, {user.displayName}</Link>
                </WrapItem>}
                
                <WrapItem>
                    <Button variant='ghost'><MoonIcon w={5} h={5} color='gray.500' /></Button>
                </WrapItem>
            </Wrap>
        </Box>
    );
};

