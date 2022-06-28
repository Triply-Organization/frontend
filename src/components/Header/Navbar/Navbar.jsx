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
                className={
                  activeTab === index
                    ? 'header__navbar-item header__navbar-item--active'
                    : 'header__navbar-item'
                }
                onClick={() => handleSetActiveTab(index)}
                key={index}
              >
                {item.title}
                <Subnav subnavItem={item.subnav} />
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
}
