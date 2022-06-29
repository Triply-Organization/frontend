/* eslint-disable react/prop-types */
import React from 'react';

import './Navbar.scss';
import Subnav from './Subnav/Subnav';

export default function Navbar(props) {
  const { navItem, activeTab, handleSetActiveTab } = props;
  return (
    <nav className="header__navbar-wrapper">
      <ul className="header__navbar">
        {navItem.map((item, index) => {
          return (
            <>
              <li
                className="header__navbar-item"
                onClick={() => handleSetActiveTab(index)}
                key={index}
              >
                <a
                  href="#"
                  className={
                    activeTab === index
                      ? 'header__navbar-link header__navbar-link--active'
                      : 'header__navbar-link'
                  }
                >
                  {item.title}
                </a>
                <Subnav subnavItem={item.subnav} />
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
}
