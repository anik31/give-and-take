import { Box, Grid, Text } from "@chakra-ui/react";
import { LinkCard } from "components";

export function Home(){
    return (
        <Box>
            <Text fontSize="3xl" mt={3} align="center">Pull Requests for Review</Text>
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
    );
}