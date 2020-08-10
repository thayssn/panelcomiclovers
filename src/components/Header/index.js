import React from 'react';
import { Link } from 'react-router-dom';
import HeaderStyle from './style';
import logo from '../../assets/logo_text.png';
import { isLoggedIn } from '../../services/auth';

export default function Header() {
  return (
    <HeaderStyle>
      <div className="header__container">
        <div className="logo__wrapper">
          <Link to={isLoggedIn() ? '/books' : '/login'} className="logo"><h1><img src={logo} alt="Comic Lovers" width="230" /></h1></Link>
        </div>
        <div className="header__nav">
          <Link to="/users">Usuários</Link>
          <Link to="/approval">Aprovação</Link>
          <Link to="/books">Quadrinhos</Link>
          <Link to="/collections">Coleções Públicas</Link>
          <Link to="/illustrators">Ilustradores</Link>
          <Link to="/colorists">Coloristas</Link>
          <Link to="/licensors">Licenciantes</Link>
          <Link to="/writers">Autores</Link>
          <Link to="/publishers">Editoras</Link>
        </div>
      </div>
    </HeaderStyle>
  );
}
