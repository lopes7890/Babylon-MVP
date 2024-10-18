import React from 'react';
import './FooterNav.css';
import live_icon from '../../assets/live_icon.png';
import lapis from '../../assets/lapis.png';
import home from '../../assets/home.png';
import books from '../../assets/livros.png';
import perfil from '../../assets/perfil.png';
import { Link } from 'react-router-dom';
function FooterNav() {
  return (
    <footer className="footer">
      <Link to="/">
        <img src={home} alt="" />
      </Link>
      <Link to="/library">
        <img src={books} alt="" />
      </Link>
      <Link to="/lives">
        <img src={live_icon} alt="" />
      </Link>
      <Link to="/workshop">
        <img src={lapis} alt="" />
      </Link>
      <Link to="/profile">
        <img src={perfil} alt="" />
      </Link>
    </footer>
  );
}

export default FooterNav;
