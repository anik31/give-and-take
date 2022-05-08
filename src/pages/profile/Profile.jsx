import { Avatar, Flex, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import {DataTabs} from "./DataTabs";

const tabData = [
    {
      label: 'My Pull Requests',
      content: 'Perhaps the greatest dish ever invented.',
    },
    {
      label: 'Reviewed Pull Requests',
      content:
        'Perhaps the surest dish ever invented but fills the stomach more than rice.',
    },
]

export function Profile(){
    return (
        <>
            <Flex justify="center" align="center" mt="2rem" gap={10}>
                <Avatar size='2xl' name='Segun Adebayo'/>
                <Flex direction="column">
                    <Text fontSize="3xl">Aniet Prksf</Text>
                    <Text fontSize="xl">test@test.com</Text>
                </Flex>
                <IconButton variant="outline" aria-label='Search database' icon={<EditIcon />} />
            </Flex>
            <Flex justify="center" align="center" mt={2} gap={10}>
                <Text fontSize="xl">POD - D</Text>
                <Text fontSize="xl">TEAM - D3</Text>
            </Flex>

            <DataTabs data={tabData} />
            
        </>
    );
}