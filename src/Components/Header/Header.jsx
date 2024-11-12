import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import './Header.css';
import useLogged from '../../contexts/loggedContext';
import Button from '../Buttons/Button';

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
            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=bEY47UG2fUOa6dgBuCn6lHFM9GWUW69Bp1JRdJKf_6hUM040QVo0MDc4NUNBSjJSUjZJOEg3MVZUVS4u">Seja um colaborador</a>
          </li>
        </ul>

        {!isLoggedIn && (
          <div className="auth-button">
            {/* <Link to="/login?auth=signup" className="btn">
              <button>Cadastre-se</button>
            </Link> */}
            <div>
              <Button href={'/login?auth=signup'}>Cadastre-se</Button>
            </div>
            <div>
              <Button href={'/login'}>Entrar</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
