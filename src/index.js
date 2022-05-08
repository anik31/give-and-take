import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { AllPullsProvider, AuthProvider, MyPullsProvider, ReviewedPullsProvider } from 'context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <AllPullsProvider>
            <MyPullsProvider>
              <ReviewedPullsProvider>
                <App />
              </ReviewedPullsProvider>
            </MyPullsProvider>
          </AllPullsProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
