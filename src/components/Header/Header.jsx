import React from 'react';
import { GrLanguage } from 'react-icons/gr';
import { VscAccount } from 'react-icons/vsc';

import logo from '../../assets/images/logo.png';
import './Header.scss';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="header__wrapper">
      <div className="header__left-side">
        <div className="header__logo-wrapper">
          <img src={logo} alt="logo" className="header__logo" />
        </div>
        <Navbar
          navItem={[
            { title: 'home', subnav: [] },
            { title: 'tours', subnav: ['tour1', 'tour2', 'tour3', 'tour4'] },
            {
              title: 'destinations',
              subnav: ['destination1', 'destination2', 'destination3'],
            },
            { title: 'contact', subnav: [] },
          ]}
        />
      </div>
      <div className="header__right-side">
        <div className="header__multi-lang-btn">
          <span className="header__multi-lang-icon">
            <GrLanguage />
          </span>
          <span className="header__multi-lang-words">EN</span>
        </div>
        <div className="header__account">
          <div className="header__account-icon">
            <VscAccount />
          </div>
        </div>
      </div>
    </header>
  );
}
