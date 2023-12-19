import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <ChakraProvider>
        {localStorage.setItem('chakra-ui-color-mode', 'dark')}
        <ColorModeScript initialColorMode={'dark'} />
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </>
);