import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SiderbarMenu.css'; // Importa o arquivo CSS
import menu_hamburguer from '../../assets/menu_hamburguer.png'

function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-menu">
          <ul>
            <li><Link to="/profile">Seu perfil</Link></li>
            <li><Link to="/iastory">IA Conta histórias</Link></li>
            <li><Link to="/lives">Lives</Link></li>
            <li><Link to="/workshop">Oficina de criação</Link></li>
            <li><Link to="/library">Sua Biblioteca</Link></li>
            <li><Link to="/bookclub">Clube do livro</Link></li>
            <li><Link to="/feed">Publicações</Link></li>
            <li><Link to="/home">Configurações</Link></li>
          </ul>
        </div>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
      <img id='menu-hamburger' src={menu_hamburguer} alt="" />
      </div>
    </>
  );
}

export default SidebarMenu;
