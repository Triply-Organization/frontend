import React from 'react';

import logo from '../../assets/images/logo.png';
import './Header.scss';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="header__wrapper">
      <div className="header__logo-wrapper">
        <img src={logo} alt="logo" className="header__logo" />
      </div>
      <Navbar />
      <div className="header__facilities-wrapper">
        <div className="header__multi-lang-btn">MultiLang</div>
        <div className="header__account-group">
          <div className="header__register-btn">Register</div>
          <div className="header__sign-up-btn">Sign Up</div>
        </div>
      </div>
    </header>
  );
}
