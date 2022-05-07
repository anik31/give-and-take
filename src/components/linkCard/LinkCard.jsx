import { LinkBox, LinkOverlay, Box, Heading, Text } from '@chakra-ui/react';
import {
    Stat,
    StatLabel,
    StatNumber
  } from '@chakra-ui/react';

export function LinkCard(){
    return (
        <LinkBox as='article' maxW='max-content' p='5' borderWidth='1px' rounded='md' 
        display="flex" alignItems="center" justifyContent="space-between" gap={20}>
            <Box>
                <Box as='time' dateTime='2021-01-15 15:30:00 +0000 UTC'>
                    13 days ago
                </Box>
                <Heading size='md' my='2'>
                    <LinkOverlay href='https://google.com/' isExternal={true}>
                    New Year, New Beginnings
                    </LinkOverlay>
                </Heading>
                <Text>
                    Catch up on what’s been cookin’
                </Text>
            </Box>    

            <Stat>
                <StatLabel>Reviews Pending</StatLabel>
                <StatNumber>2</StatNumber>
            </Stat>
        </LinkBox>
    );
};