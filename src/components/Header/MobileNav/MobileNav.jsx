/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { Button } from 'antd';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

import './MobileNav.scss';

const { Title } = Typography;

export default function MobileNav(props) {
  let navigate = useNavigate();
  const {
    mobileNavStatus,
    onChangeNavbarStatus,
    navItem,
    userDataLoginMobile,
  } = props;
  useEffect(() => {
    const mobileNav = document.querySelector('.mobileNav__overlays');
    if (mobileNavStatus) {
      mobileNav.classList.add('mobileNav__overlays--transition');
    } else {
      mobileNav.classList.remove('mobileNav__overlays--transition');
    }
  }, [mobileNavStatus]);
  return (
    <div className="mobileNav__wrapper">
      <div
        className="mobileNav__icon"
        onClick={() => {
          onChangeNavbarStatus();
        }}
      >
        <FaBars />
      </div>
      <div className="mobileNav__overlays">
        <div className="mobileNav_close-btn-wrapper">
          <button
            className="mobileNav_close-btn"
            onClick={() => {
              onChangeNavbarStatus();
            }}
          >
            <VscChromeClose />
          </button>
        </div>

        <div className="mobileNav__account">
          <Title className="mobileNav__account-heading" level={4}>
            My account
          </Title>
          <div className="mobileNav__account-btn">
            <Button
              type="primary"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              type="default"
              size="large"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        </div>

        {/* <div className="mobileNav__account">
          <Title className="mobileNav__account-heading" level={4}>
            Hi Duy Vo
          </Title>
          <ul className="mobileNav__list">
            {userDataLoginMobile.map((item, index) => {
              return (
                <li className="mobileNav__item" key={index}>
                  <a href="#" className="mobileNav__link">
                    <span className="mobileNav__icon">{item.icon}</span>
                    <span className="mobileNav__words">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div> */}

        <div className="mobileNav__list-wrapper">
          <ul className="mobileNav__list">
            {navItem.map((item, index) => {
              return (
                <li className="mobileNav__item" key={index}>
                  <a href="#" className="mobileNav__link">
                    <span className="mobileNav__icon">{item.icon}</span>
                    <span className="mobileNav__words">{item.title}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
