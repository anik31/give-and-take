import { Avatar, Flex, Text, IconButton, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons'
import {DataTabs} from "./DataTabs";
import { useAuth } from 'context';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input
} from '@chakra-ui/react';
import { useRef } from "react";

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
    const {logoutUser, user} = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    return (
        <>
            <Flex justify="center" align="center" mt="2rem" gap={10}>
                <Avatar size='2xl' name={user.displayName} />
                <Flex direction="column">
                    <Text fontSize="3xl">{user.displayName}</Text>
                    <Text fontSize="xl">{user.email}</Text>
                </Flex>
            </Flex>

            <Flex justify="center" align="center" mt={2} gap={10}>
                <Text fontSize="xl">POD - D</Text>
                <Text fontSize="xl">TEAM - D3</Text>
                <IconButton variant="outline" aria-label='Search database' icon={<EditIcon />} onClick={onOpen} />
                <Button colorScheme="red" variant="outline" onClick={()=>logoutUser()}>Logout</Button>
            </Flex>
    
            <DataTabs data={tabData} />
            
            <Modal isCentered isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay
                bg='none'
                backdropFilter='auto'
                backdropBlur='2px'
                />
                <ModalContent>
                <ModalHeader>Update POD & Team</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>POD</FormLabel>
                        <Input ref={initialRef} placeholder='POD' />
                        <FormLabel>Team</FormLabel>
                        <Input placeholder='Team' />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}