import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

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

  function login() {
    setIsLoggedIn(true);
  }

  function logout() {
    setIsLoggedIn(false);
    setUserData({
      nome: null,
      gmail: null,
      telefone: null,
      idade: null,
      genero: null,
    });
    window.localStorage.removeItem('userData');
  }

  // Efeito para armazenar os dados do cliente em localStorage sempre que o mesmo fizer login ou quando os dados do usuario for alterado
  useEffect(() => {
    if (isLoggedIn && userData.gmail) {
      console.log(userData);
      window.localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [isLoggedIn, userData]);

  // Efeito para logar o usuario automaticamente utilizando os dados armazenados em localStore do login anterior
  useLayoutEffect(() => {
    try {
      const dataStored = JSON.parse(window.localStorage.getItem('userData'));

      if (dataStored.nome) {
        setUserData(dataStored);
        login();
      }
    } catch (erro) {
      console.warn('Dados de login do usuario não encontrado.');
    }
  }, []);

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
