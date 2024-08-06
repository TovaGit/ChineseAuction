import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{login, setLogin}}>
      {children}
    </LoginContext.Provider>
  );
};
