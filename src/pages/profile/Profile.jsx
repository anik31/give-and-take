import { EditIcon } from '@chakra-ui/icons'
import {DataTabs} from "./DataTabs";
import { useAuth, useMyPulls, useReviewedPulls } from 'context';
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
    Input,
    Avatar, Flex, Text, IconButton, Button
} from '@chakra-ui/react';
import { useRef, useState } from "react";

const initialUserInfo = {
    pod: "",
    team: "",
    gitUser: "",
    reviewScore: 0
}

export function Profile(){
    const {logoutUser, user} = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const {myPullsState, addUserInfo} = useMyPulls();
    const {reviewedPullsState} = useReviewedPulls();
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const {pod, team, gitUser, reviewScore} = myPullsState.userInfo;

    const tabData = [
        {
          label: 'My Pull Requests',
          content: myPullsState.myPulls,
        },
        {
          label: 'Reviewed Pull Requests',
          content:
            reviewedPullsState,
        },
    ]
    
    const updateUserInfoHandler = () => {
        if(userInfo.pod!=="" && userInfo.team!=="" && userInfo.gitUser!==""){
            addUserInfo(userInfo);
        }
        setUserInfo(initialUserInfo);
        onClose();
    }

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
                <Text fontSize="xl">POD - {pod}</Text>
                <Text fontSize="xl">TEAM - {team}</Text>
            </Flex>

            <Flex justify="center" align="center" mt={2} gap={10}>
                <Text fontSize="xl">Github Username - {gitUser}</Text>
                <Text fontSize="xl">Review Score - {reviewScore}</Text>
                <IconButton variant="outline" aria-label='Search database' icon={<EditIcon />} 
                onClick={onOpen} />
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
                        <Input ref={initialRef} placeholder='POD' value={userInfo.pod} 
                        onChange={({target})=>setUserInfo(prev=>({...prev,pod:target.value}))} />
                        
                        <FormLabel>Team</FormLabel>
                        <Input placeholder='Team' value={userInfo.team} 
                        onChange={({target})=>setUserInfo(prev=>({...prev,team:target.value}))} />
                        
                        <FormLabel>Github Username</FormLabel>
                        <Input placeholder='Github Username' value={userInfo.gitUser} 
                        onChange={({target})=>setUserInfo(prev=>({...prev,gitUser:target.value}))} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={updateUserInfoHandler}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}