import {
    Stat,
    StatLabel,
    StatNumber,
    useToast,
    LinkBox, LinkOverlay, Box, Heading, Text, IconButton
  } from '@chakra-ui/react';
  import { CheckIcon } from '@chakra-ui/icons'
import { useLocation } from 'react-router-dom';
import { useAllPulls, useMyPulls, useReviewedPulls } from 'context';
import axios from "axios";

export function LinkCard({value}){
    const toast = useToast();
    const {pullLink, author, reviewPending, title} = value;
    const {pathname} = useLocation();
    const {myPullsState, addUserInfo} = useMyPulls();
    const {updateAllPulls, deleteFromAllPulls} = useAllPulls();
    const {addToReviewedPulls} = useReviewedPulls();

    const getPullData = async(url) => {
        url=`https://api.github.com/repos${url.slice(18)}`;
        url=url.replace("pull","pulls");
        const {data} = await axios.get(url);
        return data;
    };

    const getReviews = async(url) => {
        url=`https://api.github.com/repos${url.slice(18)}/reviews`;
        url=url.replace("pull","pulls");
        const {data} = await axios.get(url);
        return data;
    };

    const reviewedHandler = async() => {
        const data = await getPullData(pullLink);
        const reviews = await getReviews(pullLink);
        if(data.user.login===myPullsState.userInfo.gitUser){
            toast({
                title: "You can't review your own pull request",
                status: "error",
                position: "bottom-right",
                isClosable: true
            })
        }else if(reviews.some(review=>review.user.login===myPullsState.userInfo.gitUser)){
            toast({
                title: "Thank you for reviewing this pull request",
                status: "success",
                position: "bottom-right",
                isClosable: true
            })
            const reviewPendingUpdated = reviewPending-1;
            if(reviewPendingUpdated===0){
                deleteFromAllPulls(value);
            }else{
                updateAllPulls({...value, reviewPending:reviewPendingUpdated});
            }
            addToReviewedPulls(value);
            addUserInfo({...myPullsState.userInfo, reviewScore: myPullsState.userInfo.reviewScore+1});
        }
    };

    return (
        <LinkBox as='article' maxW='max-content' p='5' borderWidth='1px' rounded='md' 
        display="flex" alignItems="center" justifyContent="space-between" gap={5}>
            <Box>
                <Heading size='md' my='2'>
                    <LinkOverlay href={pullLink} isExternal={true}>
                    {title}
                    </LinkOverlay>
                </Heading>
                <Text>
                    Author: {author}
                </Text>
            </Box>    

            {pathname==="/" && <Stat>
                <StatLabel>Reviews Pending</StatLabel>
                <StatNumber>{reviewPending}</StatNumber>
            </Stat>}
            
            {pathname==="/" && <IconButton icon={<CheckIcon />} onClick={reviewedHandler} />}
        </LinkBox>
    );
};
