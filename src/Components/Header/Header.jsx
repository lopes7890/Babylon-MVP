import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
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
        <div className="auth-button">
          <Link to="/login" className="btn">
            <button>Entrar</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
