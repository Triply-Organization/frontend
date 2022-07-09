import { UserOutlined } from '@ant-design/icons';
import { AreaChartOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { TbTicket } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import CurrencySelect from '../CurrencySelect/CurrencySelect';
import LanguageSelect from './../LanguageSelect/LanguageSelect';
import './Header.scss';
import MobileNav from './MobileNav/MobileNav';
import Navbar from './Navbar';

export default function Header() {
  // state set for active tab
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname === '/') {
      return 0;
    } else {
      return 1;
    }
  });

  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('user'))?.roles || [];
  const id = JSON.parse(localStorage.getItem('user'))?.id || 1;

  // state set for window srollY
  const [scrollY, setScrollY] = useState(window.scrollY);
  // state set for window width
  const [width, setWidth] = useState(window.innerWidth);
  // state set for mobileNav status
  const [mobileNavStatus, setMobileNavStatus] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const userDataLogin = (
    <Menu
      items={[
        {
          key: '1',
          type: 'group',
          label: `Hi ${
            JSON.parse(localStorage.getItem('user'))?.name || 'there'
          }`,
          children: [
            roles.includes('ROLE_USER')
              ? {
                  key: '1-1',
                  label: (
                    <span className="header__language-item">
                      <Link
                        to={`/setting-account/${id}`}
                        className="header__language-words"
                      >
                        {t('header.logged_in.my_profile')}
                      </Link>
                    </span>
                  ),
                }
              : null,
            roles.includes('ROLE_USER')
              ? {
                  key: '1-2',
                  label: (
                    <span className="header__language-item">
                      <Link to="/my-tours" className="header__language-words">
                        {t('header.logged_in.tour')}
                      </Link>
                    </span>
                  ),
                }
              : null,
            roles.includes('ROLE_ADMIN')
              ? !roles.includes('ROLE_USER')
                ? {
                    key: '1-21',
                    label: (
                      <span className="header__language-item">
                        <Link to="/admin" className="header__language-words">
                          {t('header.logged_in.dashboard')}
                        </Link>
                      </span>
                    ),
                  }
                : null
              : !roles.includes('ROLE_USER')
              ? {
                  key: '1-21',
                  label: (
                    <span className="header__language-item">
                      <Link to="/cms" className="header__language-words">
                        {t('header.logged_in.dashboard')}
                      </Link>
                    </span>
                  ),
                }
              : null,
            {
              key: '1-3',
              label: (
                <span className="header__language-item">
                  <Link
                    onClick={handleLogout}
                    to="/login"
                    className="header__language-words"
                  >
                    {t('cta.logout')}
                  </Link>
                </span>
              ),
            },
          ],
        },
      ]}
    />
  );

  //---------- User Data When Login ----------->
  const userDataLoginMobile = [
    roles.includes('ROLE_USER')
      ? {
          title: `${t('header.logged_in.my_profile')}`,
          icon: <UserOutlined />,
          link: `/setting-account/${id}`,
        }
      : null,
    roles.includes('ROLE_USER')
      ? {
          title: `${t('header.logged_in.tour')}`,
          icon: <TbTicket />,
          link: '/my-tours',
        }
      : null,
    roles.includes('ROLE_ADMIN')
      ? !roles.includes('ROLE_USER')
        ? {
            title: `${t('header.logged_in.dashboard')}`,
            icon: <AreaChartOutlined />,
            link: '/admin',
          }
        : null
      : !roles.includes('ROLE_USER')
      ? {
          title: `${t('header.logged_in.dashboard')}`,
          icon: <AreaChartOutlined />,
          link: '/cms',
        }
      : null,

    {
      title: `${t('cta.logout')}`,
      icon: <AiOutlineLogout />,
      link: '/login',
      onClick: handleLogout,
    },
  ];

  //--------------- Nav Item ----------------->
  const navItem = [
    {
      title: `${t('header.home')}`,
      icon: <AiOutlineHome />,
      subnav: [],
      link: '/',
    },
    {
      title: `${t('header.tour')}`,
      icon: <TbTicket />,
      subnav: [],
      link: '/tours',
    },
  ];

  //------------- User Not Login ------------>
  const userDataNoLogin = (
    <Menu
      items={[
        {
          disabled: true,
          key: '1',
          label: (
            <span className="header__language-heading header__language-item">
              <span className="header__language-abbre">
                {t('header.not_logged_in.my_account')}
              </span>
            </span>
          ),
        },
        {
          key: '2',
          label: (
            <Button type="primary" size="large">
              <Link to="/login">{t('cta.login')}</Link>
            </Button>
          ),
        },
        {
          key: '3',
          label: (
            <Button type="default" size="large">
              <Link to="/register">{t('cta.register')}</Link>
            </Button>
          ),
        },
      ]}
    />
  );

  const handleSetActiveTab = id => {
    setActiveTab(id);
  };

  const onChangeNavbarStatus = () => {
    setMobileNavStatus(!mobileNavStatus);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
  }, [scrollY]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <header
      className={
        scrollY > 0
          ? 'header__wrapper header__wrapper--transition'
          : 'header__wrapper'
      }
    >
      <div className="header__left-side">
        <div className="header__logo-wrapper" onClick={() => navigate('/')}>
          <img src={logo} alt="logo" className="header__logo" />
        </div>
        {width < 1023 ? null : (
          <Navbar
            activeTab={activeTab}
            handleSetActiveTab={handleSetActiveTab}
            navItem={navItem}
          />
        )}
      </div>
      <div className="header__right-side">
        {width < 1023 ? (
          <MobileNav
            mobileNavStatus={mobileNavStatus}
            onChangeNavbarStatus={onChangeNavbarStatus}
            navItem={navItem}
            userDataLoginMobile={userDataLoginMobile}
          />
        ) : (
          <>
            <div className="header__multi-currency">
              <CurrencySelect />
            </div>
            <div className="header__multi-lang-wrapper">
              <LanguageSelect />
            </div>

            {token ? (
              <div className="header__account-wrapper">
                <Dropdown overlay={userDataLogin} placement="bottomRight" arrow>
                  <div className="header__account-icon">
                    <Avatar icon={<UserOutlined />} />
                  </div>
                </Dropdown>
              </div>
            ) : (
              <div className="header__account-wrapper">
                <Dropdown
                  overlay={userDataNoLogin}
                  overlayClassName="header__account-dropdown"
                  placement="bottomRight"
                  arrow
                >
                  <div className="header__account-icon">
                    <Avatar
                      src={
                        JSON.parse(localStorage.getItem('user'))?.avatar || null
                      }
                      icon={
                        JSON.parse(localStorage.getItem('user'))
                          ?.avatar ? null : (
                          <UserOutlined />
                        )
                      }
                    />
                  </div>
                </Dropdown>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
