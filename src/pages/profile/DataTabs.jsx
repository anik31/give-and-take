import { Tabs, TabList, TabPanels, Tab, TabPanel, Grid } from '@chakra-ui/react';
import { LinkCard } from 'components';

export function DataTabs({ data }) {
    return (
      <Tabs isFitted mt={5}>
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={4} key={index}>
              <Grid templateColumns='repeat(2, 1fr)' justifyItems="center" gap={10} my={5}>
                {tab.content.map(pull=><LinkCard value={pull} key={pull.id} />)}
              </Grid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    )
}