import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
const Home =({socket}) => {
  return (
    <div>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>
            <h1 className='text-3xl'>Login</h1>
          </Tab>
          <Tab>
            <h1 className='text-3xl'>Signup</h1>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login socket={socket}/>
          </TabPanel>
          <TabPanel>
              <Signup/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Home;
