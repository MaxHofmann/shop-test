import React from 'react';
import logoSvg from '../../assets/img/shop-logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Sneaker logo" />
            <div>
              <h1>shoe store</h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
