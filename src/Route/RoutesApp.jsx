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
import Register from '../pages/Register/Register';
import SettingAccount from '../pages/SettingAccount/SettingAccount';

const RoutesApp = () => {
  topbar.config({
    barColors: {
      0: 'rgba(34,193,195,1)',
      1.0: 'rgba(253,187,45,1)',
    },
  });

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Outlet />
            <Footer />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="setting-account/:id" element={<SettingAccount />} />
        <Route path="tours">
          <Route index element={<AllTours />} loading />
          <Route path=":search" element={<AllTours />} loading />
        </Route>
        <Route path="my-tours" element={<MyTour />} loading />
        <Route path="detail/:id" element={<DetailTour />} />
        <Route path="confirmation/:id" element={<Confirmation />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} loading />
        <Route path="tours" element={<Tours />} loading />
        <Route path="users" element={<Users />} loading />
        <Route path="customers" element={<Customers />} loading />
        <Route path="reviews" element={<Reviews />} loading />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="confirmation/:id" element={<Confirmation />} />

      <Route path="cms" element={<CMSCustomer />}>
        <Route index element={<Navigate to="dashboard" replace />} loading />
        <Route path="dashboard" element={<CMSDashBoard />} loading />
        <Route path="tours" element={<CMSTours />} loading />
        <Route path="add-tour" element={<CMSAddTour />} loading />
        <Route path="edit-tour/:id" element={<CMSEditTour />} loading />
        <Route path="set-schedule/:id" element={<CMSTourSchedule />} loading />
      </Route>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
