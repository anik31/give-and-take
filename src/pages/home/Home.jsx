import { Box, Grid, Text, Button } from "@chakra-ui/react";
import { LinkCard } from "components";
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

export function Home(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();

    return (
        <>
        <Box>
            <Text fontSize="3xl" mt={3} align="center">Pull Requests for Review</Text>
            
            <Button
                ml='4'
                onClick={onOpen}
            >
                Add PR for review
            </Button>

            <Grid templateColumns='repeat(2, 1fr)' justifyItems="center" gap={10} my={10}>
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
                <LinkCard />
            </Grid>
        </Box>

        <Modal isCentered isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
            <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropBlur='2px'
            />
            <ModalContent>
            <ModalHeader>Add PR Link for Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl>
                    <FormLabel>Pull Request Link</FormLabel>
                    <Input ref={initialRef} placeholder='Pull Request Link' />
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