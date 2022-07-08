import {
  CommentOutlined,
  EnvironmentOutlined,
  LoginOutlined,
  PieChartOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import logo from '../../assets/images/logo-white.png';
import './Admin.scss';

const { Content, Footer, Sider } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [url, setUrl] = useState(location.pathname.slice(7));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    if (location.pathname.includes('dashboard')) {
      setUrl('dashboard');
    } else if (location.pathname.includes('tours')) {
      setUrl('tours');
    } else if (location.pathname.includes('users')) {
      setUrl('users');
    } else if (location.pathname.includes('customers')) {
      setUrl('customers');
    } else if (location.pathname.includes('reviews')) {
      setUrl('reviews');
    }
  }, [location.pathname]);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <Menu
          inlineCollapsed={true}
          theme="dark"
          selectedKeys={[url]}
          mode="inline"
        >
          <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
            <Link to="dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="tours" icon={<EnvironmentOutlined />}>
            <Link to="tours">Tours</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="users">Users</Link>
          </Menu.Item>
          <Menu.Item key="customers" icon={<UsergroupAddOutlined />}>
            <Link to="customers">Customers</Link>
          </Menu.Item>
          <Menu.Item key="reviews" icon={<CommentOutlined />}>
            <Link to="reviews">Reviews</Link>
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
      <Layout className="site-layout">
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          NFQ Asia ©2022 Created by Akatsuki team
        </Footer>
      </Layout>
    </Layout>
  );
}
