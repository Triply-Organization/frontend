import { LoginOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiFillDashboard, AiOutlineUnorderedList } from 'react-icons/ai';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import logo from '../../assets/images/logo.webp';
import './CMSCustomer.scss';

const { Content, Sider } = Layout;

const CMSCustomer = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState(['dashboard']);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('last_path');
  };
  const loadingContext = useLoadingContext();

  useEffect(() => {
    if (location.pathname.includes('dashboard')) setUrl(['dashboard']);
    else setUrl('tours');
    setTimeout(() => {
      loadingContext.done();
    }, 600);
  }, [location.pathname]);

  return (
    <Layout className="layout-cms-customer">
      <Sider>
        <Menu
          mode="inline"
          selectedKeys={url}
          style={{
            height: '100%',
            borderRight: 0,
          }}
        >
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Menu.Item key="dashboard" icon={<AiFillDashboard />}>
            <Link to={'dashboard'}>Dashboard</Link>
          </Menu.Item>
          <Menu.Item
            key="tours"
            icon={<AiOutlineUnorderedList />}
            onClick={() => navigate('tours')}
          >
            Tours
          </Menu.Item>
          <Menu.Item
            onClick={handleLogout}
            key="logout"
            icon={<LoginOutlined />}
          >
            <Link to="/login">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
          height: 'fit-content',
        }}
      >
        <Content className="cms-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CMSCustomer;
