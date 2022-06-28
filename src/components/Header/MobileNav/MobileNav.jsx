/* eslint-disable react/prop-types */
import { Button } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';

import './MobileNav.scss';

const { Title } = Typography;
export default function MobileNav(props) {
  const { navItem } = props;
  return (
    <div className="mobileNav__wrapper">
      <div className="mobileNav__icon">
        <FaBars />
      </div>
      <div className="mobileNav__overlays">
        <div className="mobileNav_close-btn-wrapper">
          <button className="mobileNav_close-btn">
            <VscChromeClose />
          </button>
        </div>
        <div className="mobileNav__account">
          <Title className="mobileNav__account-heading" level={4}>
            My account
          </Title>
          <div className="mobileNav__account-btn">
            <Button type="primary" size="large">
              Sign Up
            </Button>
            <Button type="default" size="large">
              Register
            </Button>
          </div>
        </div>
        <div className="mobileNav__list-wrapper">
          <ul className="mobileNav__list">
            {navItem.map((item, index) => {
              return (
                <li className="mobileNav__item" key={index}>
                  <span className="mobileNav__icon">{item.icon}</span>
                  <span className="mobileNav__words">{item.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
