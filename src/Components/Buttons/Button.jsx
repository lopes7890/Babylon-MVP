import { Link } from 'react-router-dom';
import style from './css/Button.module.css';

export default function Button({ children, href }) {
  return (
    <Link to={href || '#'} className={style.button}>
      {children}
    </Link>
  );
}
