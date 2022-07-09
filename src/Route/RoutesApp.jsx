import { CaretUpOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-loading';
import { topbar } from 'react-router-loading';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Admin from '../pages/Admin/Admin';
import Customers from '../pages/Admin/Customers/Customers';
import { Dashboard } from '../pages/Admin/Dashboard/Dashboard';
import Reviews from '../pages/Admin/Reviews/Reviews';
import Tours from '../pages/Admin/Tours/Tours';
import Users from '../pages/Admin/Users/Users';
import AllTours from '../pages/Alltours/AllTours';
import CMSAddTour from '../pages/CMSCustomer/CMSAddTour';
import CMSCustomer from '../pages/CMSCustomer/CMSCustomer';
import CMSDashBoard from '../pages/CMSCustomer/CMSDashBoard';
import CMSEditTour from '../pages/CMSCustomer/CMSEditTour';
import CMSTourSchedule from '../pages/CMSCustomer/CMSTourSchedule';
import CMSTours from '../pages/CMSCustomer/CMSTours';
import Checkout from '../pages/Checkout/Checkout';
import Confirmation from '../pages/Confirmation/Confirmation';
import DetailTour from '../pages/DetailTour/DetailTour';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyTour from '../pages/MyTour/MyTour';
import { Page404 } from '../pages/Page404/Page404';
import Register from '../pages/Register/Register';
import SettingAccount from '../pages/SettingAccount/SettingAccount';
import PrivateRoute from './PrivateRoute';

const RoutesApp = () => {
  topbar.config({
    barColors: {
      0: 'rgba(34,193,195,1)',
      1.0: 'rgba(253,187,45,1)',
    },
  });

  const style = {
    height: 50,
    width: 50,
    lineHeight: '50px',
    borderRadius: 9999,
    backgroundColor: 'rgb(220, 131, 78)',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginLeft: 40,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Outlet />
            <BackTop>
              <div style={style}>
                <CaretUpOutlined />
              </div>
            </BackTop>
            <Footer />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="tours">
          <Route index element={<AllTours />} loading />
          <Route path=":search" element={<AllTours />} loading />
        </Route>

        <Route
          path="setting-account/:id"
          element={
            <PrivateRoute role={['ROLE_USER']}>
              <SettingAccount loading />
            </PrivateRoute>
          }
        />

        <Route
          path="my-tours"
          element={
            <PrivateRoute role={['ROLE_USER']}>
              <MyTour loading />
            </PrivateRoute>
          }
          loading
        />

        <Route path="detail/:id" element={<DetailTour />} />
        <Route
          path="confirmation/:id"
          element={
            <PrivateRoute role={['ROLE_USER']}>
              <Confirmation loading />
            </PrivateRoute>
          }
        />

        <Route
          path="checkout/:id"
          element={
            <PrivateRoute role={['ROLE_USER']}>
              <Checkout loading />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="login" element={<Login />} loading />
      <Route path="register" element={<Register />} loading />
      <Route
        path="/admin"
        element={
          <PrivateRoute role={['ROLE_ADMIN']}>
            <Admin loading />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute role={['ROLE_ADMIN']}>
              <Dashboard loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="tours"
          element={
            <PrivateRoute role={['ROLE_ADMIN']}>
              <Tours loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="users"
          element={
            <PrivateRoute role={['ROLE_ADMIN']}>
              <Users loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="customers"
          element={
            <PrivateRoute role={['ROLE_ADMIN']}>
              <Customers loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="reviews"
          element={
            <PrivateRoute role={['ROLE_ADMIN']}>
              <Reviews loading />
            </PrivateRoute>
          }
          loading
        />
      </Route>

      <Route
        path="cms"
        element={
          <PrivateRoute role={['ROLE_CUSTOMER']}>
            <CMSCustomer loading />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} loading />
        <Route
          path="dashboard"
          element={
            <PrivateRoute role={['ROLE_CUSTOMER']}>
              <CMSDashBoard loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="tours"
          element={
            <PrivateRoute role={['ROLE_CUSTOMER']}>
              <CMSTours loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="add-tour"
          element={
            <PrivateRoute role={['ROLE_CUSTOMER']}>
              <CMSAddTour />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="edit-tour/:id"
          element={
            <PrivateRoute role={['ROLE_CUSTOMER']}>
              <CMSEditTour loading />
            </PrivateRoute>
          }
          loading
        />
        <Route
          path="set-schedule/:id"
          element={
            <PrivateRoute role={['ROLE_CUSTOMER']}>
              <CMSTourSchedule loading />
            </PrivateRoute>
          }
          loading
        />
      </Route>
      <Route
        path="*"
        element={
          <>
            <Header />
            <Page404 />
            <Footer />
          </>
        }
      />
    </Routes>
  );
};

export default RoutesApp;
