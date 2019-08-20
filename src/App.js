import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
