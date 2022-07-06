import { Button } from 'antd';
import { Typography } from 'antd';
import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars } from 'react-icons/fa';
import { VscChromeClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

import './MobileNav.scss';

const { Title } = Typography;
export default function MobileNav(props) {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const token = localStorage.getItem('token');

  console.log(user);
  console.log(token);
  const { t } = useTranslation();
  const {
    mobileNavStatus,
    onChangeNavbarStatus,
    navItem,
    // eslint-disable-next-line no-unused-vars
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

        {token ? (
          <div className="mobileNav__account">
            <Title className="mobileNav__account-heading" level={4}>
              Hi {user?.name}
            </Title>
            <ul className="mobileNav__list">
              {userDataLoginMobile.map((item, index) => {
                return (
                  <li
                    onClick={item.onClick}
                    className="mobileNav__item"
                    key={index}
                  >
                    <Link to={item.link} className="mobileNav__link">
                      <span className="mobileNav__icon">{item.icon}</span>
                      <span className="mobileNav__words">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="mobileNav__account">
            <Title className="mobileNav__account-heading" level={4}>
              {t('mobileNav.my_account')}
            </Title>
            <div className="mobileNav__account-btn">
              <Button type="primary" size="large">
                {t('mobileNav.login')}
              </Button>
              <Button type="default" size="large">
                {t('mobileNav.register')}
              </Button>
            </div>
          </div>
        )}

        <div className="mobileNav__list-wrapper">
          <ul className="mobileNav__list">
            {navItem.map((item, index) => {
              return (
                <li className="mobileNav__item" key={index}>
                  <Link to={'#'} className="mobileNav__link">
                    <span className="mobileNav__icon">{item.icon}</span>
                    <span className="mobileNav__words">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

MobileNav.propTypes = {
  mobileNavStatus: PropTypes.any,
  onChangeNavbarStatus: PropTypes.func,
  navItem: PropTypes.array,
  userDataLoginMobile: PropTypes.array,
};
