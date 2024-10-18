import React, { createContext, useContext, useState } from 'react';

const LoggedContext = createContext();

const LoggedProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    nome: null,
    gmail: null,
    telefone: null,
    idade: null,
    genero: null,
  });

  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <LoggedContext.Provider
      value={{ isLoggedIn, login, logout, userData, setUserData }}
    >
      {children}
    </LoggedContext.Provider>
  );
};

function useLogged() {
  return useContext(LoggedContext);
}

export { LoggedContext, LoggedProvider, useLogged };
export default useLogged;
