import React, { createContext, useContext, useState } from 'react';

const LoggedContext = createContext();

const LoggedProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <LoggedContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoggedContext.Provider>
  );
};

function useLogged() {
  return useContext(LoggedContext);
}

export { LoggedContext, LoggedProvider, useLogged };
export default useLogged;
