import React, { createContext, useContext, useState } from 'react';

const NumOfPurchases = createContext();

export const useNumOfPurchasesContext = () => useContext(NumOfPurchases);

export const PurchasesProvider = ({ children }) => {
  const [numOfPurch,setNumOfPurch] = useState(0);

  return (
    <NumOfPurchases.Provider value={{ numOfPurch,setNumOfPurch}}>
      {children}
    </NumOfPurchases.Provider>
  );
};