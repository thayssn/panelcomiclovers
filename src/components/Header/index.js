import React from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle from './style';

export default function Header() {
  return (
    <HeaderStyle>
      <div className="header__container">
        <Link to="/login"><h1>Comic Lovers</h1></Link>
        <div className="header__nav">
          <Link to="/users">Usuários</Link>
          <Link to="/books">Livros</Link>
          <Link to="/illustrators">Ilustradores</Link>
          <Link to="/licensors">Licenciantes</Link>
          <Link to="/writers">Autores</Link>
          <Link to="/publishers">Editoras</Link>
        </div>
      </div>
    </HeaderStyle>
  );
}
