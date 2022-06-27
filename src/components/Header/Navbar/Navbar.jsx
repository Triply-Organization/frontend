/* eslint-disable react/prop-types */
import React from 'react';

import './Navbar.scss';
import Subnav from './Subnav/Subnav';

export default function Navbar(props) {
  const { navItem } = props;
  return (
    <nav className="header__navbar-wrapper">
      <ul className="header__navbar">
        {navItem.map((item, index) => {
          return (
            <>
              <li className="header__navbar-item" key={index}>
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
