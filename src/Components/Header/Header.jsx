import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useLogged from '../../contexts/loggedContext';
function Header() {
  const { isLoggedIn } = useLogged();

  return (
    <header className="App-header">
      <nav className="nav-container">
        <ul className="nav-list">
          <li>
            <a href="#livros">Livros gratuitos</a>
          </li>
          <li>
            <a href="#categorias">Categorias</a>
          </li>
          <li>
            <a href="#colaborador">Seja um colaborador</a>
          </li>
        </ul>

        {!isLoggedIn && (
          <div className="auth-button">
            <Link to="/login?auth=signup" className="btn">
              <button>Cadastre-se</button>
            </Link>

            <Link to="/login" className="btn">
              <button>Entrar</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
