import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaBook,
  FaVideo,
  FaPen,
  FaList,
  FaBookReader,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';
import './SiderbarMenu.css'; // Importa o arquivo CSS
import { useLogged } from '../../contexts/loggedContext';

function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useLogged();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/profile">
                <FaUser className="menu-icon" />
                Seu perfil
              </Link>
            </li>
            <li>
              <Link to="/iastory">
                <FaBookReader className="menu-icon" />
                IA Conta histórias
              </Link>
            </li>
            <li>
              <Link to="/lives">
                <FaVideo className="menu-icon" />
                Lives
              </Link>
            </li>
            <li>
              <Link to="/workshop">
                <FaPen className="menu-icon" />
                Oficina de criação
              </Link>
            </li>
            <li>
              <Link to="/library">
                <FaBook className="menu-icon" />
                Sua Biblioteca
              </Link>
            </li>
            <li>
              <Link to="/bookclub">
                <FaList className="menu-icon" />
                Clube do livro
              </Link>
            </li>
            <li>
              <Link to="/feed">
                <FaComments className="menu-icon" />
                Publicações
              </Link>
            </li>
            <li>
              <Link to="/home">
                <FaCog className="menu-icon" />
                Configurações
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                >
                  <FaSignOutAlt className="menu-icon" />
                  Fazer logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <MdMenu className="menu-toggle-icon" />
      </div>
    </>
  );
}

export default SidebarMenu;
