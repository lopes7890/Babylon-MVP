import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import './FooterNav.css';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaPodcast, FaPencilAlt, FaUser } from 'react-icons/fa';

function FooterNav() {
  const [select, setSelect] = useState(1);

  const background = useRef(undefined);

  useLayoutEffect(() => {
    if (background.current) {
      background.current.style.transform = `translateX(${100 * select}%)`;
    }
  }, [select]);

  const moveBackground = useCallback(({ target }) => {
    const index = target.closest('a')?.getAttribute('index');
    if (index) setSelect(Number(index));
  });

  return (
    <footer className="footer-container">
      <div className="footer" onClick={moveBackground}>
        <div className="fundo" ref={background}></div>

        <Link to="/" index="0">
          <FaHome />
        </Link>

        <Link to="/library" index="1">
          <FaBook />
        </Link>
        <Link to="/lives" index="2">
          <FaPodcast />
        </Link>
        <Link to="/workshop" index="3">
          <FaPencilAlt />
        </Link>
        <Link to="/profile" index="4">
          <FaUser />
        </Link>
      </div>
    </footer>
  );
}

export default FooterNav;
