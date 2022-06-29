/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsChatRightDots } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { GrLanguage } from 'react-icons/gr';
import { MdOutlinePlace } from 'react-icons/md';
import { MdFeedback } from 'react-icons/md';
import { TbTicket } from 'react-icons/tb';

import logo from '../../assets/images/logo.png';
import './Header.scss';
import MobileNav from './MobileNav/MobileNav';
import Navbar from './Navbar';

const currency = (
  <Menu
    items={[
      {
        disabled: true,
        key: '1',
        label: (
          <span className="header__currency-heading header__currency-item">
            <span className="header__currency-abbre">Currency</span>
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <span className="header__currency-item">
            <span className="header__currency-abbre">USD</span>
          </span>
        ),
      },
      {
        key: '3',
        label: (
          <span className="header__currency-item">
            <span className="header__currency-abbre">VND</span>
          </span>
        ),
      },
    ]}
  />
);

const language = (
  <Menu
    items={[
      {
        disabled: true,
        key: '1',
        label: (
          <span className="header__language-heading header__language-item">
            <span className="header__language-abbre">Language</span>
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <span className="header__language-item">
            <span className="header__language-icon"></span>
            <span className="header__language-words">English</span>
          </span>
        ),
      },
      {
        key: '3',
        label: (
          <span className="header__language-item">
            <span className="header__language-words">Tiếng Việt</span>
          </span>
        ),
      },
    ]}
  />
);

const userDataNoLogin = (
  <Menu
    items={[
      {
        disabled: true,
        key: '1',
        label: (
          <span className="header__language-heading header__language-item">
            <span className="header__language-abbre">My Account</span>
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <Button type="primary" size="large">
            Sign Up
          </Button>
        ),
      },
      {
        key: '3',
        label: (
          <Button type="default" size="large">
            Register
          </Button>
        ),
      },
    ]}
  />
);

const userDataLogin = (
  <Menu
    items={[
      {
        disabled: true,
        key: '1',
        label: (
          <span className="header__language-heading header__language-item">
            <span className="header__language-abbre">Hi Vo Quoc Duy</span>
          </span>
        ),
      },
      {
        key: '2',
        label: (
          <span className="header__language-item">
            <a src="#" className="header__language-words">
              My Tours
            </a>
          </span>
        ),
      },
      {
        key: '3',
        label: (
          <span className="header__language-item">
            <a src="#" className="header__language-words">
              My Reviews
            </a>
          </span>
        ),
      },
      {
        key: '4',
        label: (
          <span className="header__language-item">
            <a src="#" className="header__language-words">
              Saved Tours
            </a>
          </span>
        ),
      },
      {
        key: '5',
        label: (
          <span className="header__language-item">
            <a src="#" className="header__language-words">
              Log Out
            </a>
          </span>
        ),
      },
    ]}
  />
);

const userDataLoginMobile = [
  { title: 'my tours', icon: <TbTicket /> },
  {
    title: 'my reviews',
    icon: <MdFeedback />,
  },
  {
    title: 'saved tour',
    icon: <BsHeart />,
    subnav: ['destination1', 'destination2', 'destination3'],
  },
  { title: 'logout', icon: <AiOutlineLogout /> },
];

const navItem = [
  { title: 'home', icon: <AiOutlineHome />, subnav: [] },
  {
    title: 'tours',
    icon: <TbTicket />,
    subnav: ['tour1', 'tour2', 'tour3', 'tour4'],
  },
  {
    title: 'destinations',
    icon: <MdOutlinePlace />,
    subnav: ['destination1', 'destination2', 'destination3'],
  },
  { title: 'contact', icon: <BsChatRightDots />, subnav: [] },
];

export default function Header() {
  // state set for active tab
  const [activeTab, setActiveTab] = useState(0);
  // state set for window srollY
  const [scrollY, setScrollY] = useState(window.scrollY);
  // state set for window width
  const [width, setWidth] = useState(window.innerWidth);
  // state set for mobileNav status
  const [mobileNavStatus, setMobileNavStatus] = useState(false);
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
        <div className="header__logo-wrapper">
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
              <Dropdown
                overlayClassName="header__multi-currency-dropdown"
                overlay={currency}
                placement="bottomRight"
                arrow
              >
                <Button className="header__multi-currency-container">
                  USD
                </Button>
              </Dropdown>
            </div>
            <div className="header__multi-lang-wrapper">
              <Dropdown overlay={language} placement="bottomRight" arrow>
                <Button className="header__multi-lang-btn">
                  <span className="header__multi-lang-icon">
                    <GrLanguage />
                  </span>
                  <span className="header__multi-lang-words">EN</span>
                </Button>
              </Dropdown>
            </div>

            <div className="header__account-wrapper">
              <Dropdown
                overlay={userDataNoLogin}
                overlayClassName="header__account-dropdown"
                placement="bottomRight"
                arrow
              >
                <div className="header__account-icon">
                  <Avatar icon={<UserOutlined />} />
                </div>
              </Dropdown>
            </div>

            {/* <div className="header__account-wrapper">
              <Dropdown overlay={userDataLogin} placement="bottomRight" arrow>
                <div className="header__account-icon">
                  <Avatar icon={<UserOutlined />} />
                </div>
              </Dropdown>
            </div> */}
          </>
        )}
      </div>
    </header>
  );
}
