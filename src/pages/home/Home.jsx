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
    Input,
    useToast,
    Box, Grid, Text, Button
} from '@chakra-ui/react';
import { useRef, useState } from "react";
import { useAuth, useAllPulls, useMyPulls, useReviewedPulls } from "context";
import { v4 as uuid } from "uuid";
import axios from "axios";

export function Home(){
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef();
    const {user} = useAuth();
    const [pullLinkInput, setPullLink] = useState("");
    const {addToAllPulls, allPullsState} = useAllPulls();
    const {addToMyPulls, myPullsState, addUserInfo} = useMyPulls();
    const {reviewedPullsState} = useReviewedPulls();
    
    const getPullData = async(url) => {
        url=`https://api.github.com/repos${url.slice(18)}`;
        url=url.replace("pull","pulls");
        const {data} = await axios.get(url);
        return data;
    };

    const addPullObj = {
        id: uuid(),
        pullLink: pullLinkInput,
        author: user.displayName,
        reviewPending: 2
    }

    const allPullsFiltered = allPullsState
    .filter(pull=>pull.author!==user.displayName)
    .filter(pull=>!reviewedPullsState.some(reviewedPull=>reviewedPull.pullLink === pull.pullLink));

    const checkReviewScoreHandler = () => {
        if(allPullsFiltered.length>0 && myPullsState.userInfo.reviewScore<2){
            toast({
                title: "Please give reviews to take reviews",
                status: "info",
                position: "bottom-right",
                isClosable: true
            })
        }else{
            onOpen();
        }
    }
    
    const addPullHandler = async() => {
        if(pullLinkInput===""){ 
            toast({
                title: "Please enter pull request link",
                status: "warning",
                position: "bottom-right",
                isClosable: true
            })
        }else{
            const urlArr = pullLinkInput.split("/");
            if(urlArr.length===7 && urlArr[2]==="github.com" && urlArr[5]==="pull" && !isNaN(urlArr[6])){
                const data = await getPullData(pullLinkInput);
                if(data.user.login!==myPullsState.userInfo.gitUser){
                    toast({
                        title: "This pull request doesn't belong to you",
                        status: "error",
                        position: "bottom-right",
                        isClosable: true
                    })
                }else if(data.review_comments>=2){
                    toast({
                        title: "You have already received two reviews",
                        status: "info",
                        position: "bottom-right",
                        isClosable: true
                    })
                }else if(allPullsState.some(pull=>pull.pullLink===pullLinkInput)){
                    toast({
                        title: "You have already added this pull request",
                        status: "info",
                        position: "bottom-right",
                        isClosable: true
                    })
                }else{
                    addToAllPulls({...addPullObj,title: data.title});
                    addToMyPulls({...addPullObj,title: data.title});
                    if(myPullsState.userInfo.reviewScore>2){
                        addUserInfo({...myPullsState.userInfo, reviewScore:myPullsState.userInfo.reviewScore-2});
                    }else{
                        addUserInfo({...myPullsState.userInfo, reviewScore:0});
                    }
                    setPullLink("");
                    onClose();
                }
            }else{
                toast({
                    title: "Please enter appropriate pull request link",
                    status: "error",
                    position: "bottom-right",
                    isClosable: true
                })
            }
        }
    }

    return (
        <>
        <Box>
            <Text fontSize="3xl" mt={3} align="center">Pull Requests for Review</Text>
            
            <Button
                ml='4'
                onClick={checkReviewScoreHandler}
            >
                Add PR for review
            </Button>

            <Grid templateColumns='repeat(2, 1fr)' justifyItems="center" gap={10} my={10}>
                {allPullsState.map(pull=><LinkCard value={pull} key={pull.id} />)}
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
                    <Input ref={initialRef} placeholder='Pull Request Link' value={pullLinkInput}
                    onChange={({target})=>setPullLink(target.value)} />
                </FormControl>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={addPullHandler} >
                Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}