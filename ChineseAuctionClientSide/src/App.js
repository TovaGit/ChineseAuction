import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import './flags.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/viva-dark/theme.css';
import { UserProvider } from './UserContext';
import { LoginProvider } from './LoginContex';
import {PurchasesProvider} from './NumOfPurchasesContex';
function App() {

  return (
    <> 
    <UserProvider>
      <LoginProvider>
        <PurchasesProvider>
   <MainPage ></MainPage>
   </PurchasesProvider>
   </LoginProvider>
   </UserProvider>
</>


    
  )
}
export default App;
