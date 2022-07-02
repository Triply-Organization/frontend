import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-loading';
import { topbar } from 'react-router-loading';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import AllTours from '../pages/Alltours/AllTours';
import CMSAddTour from '../pages/CMSCustomer/CMSAddTour';
import CMSCustomer from '../pages/CMSCustomer/CMSCustomer';
import CMSDashBoard from '../pages/CMSCustomer/CMSDashBoard';
import CMSTourSchedule from '../pages/CMSCustomer/CMSTourSchedule';
import CMSTours from '../pages/CMSCustomer/CMSTours';
import Checkout from '../pages/Checkout/Checkout';
import Confirmation from '../pages/Confirmation/Confirmation';
import DetailTour from '../pages/DetailTour/DetailTour';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyTour from '../pages/MyTour/MyTour';
import Register from '../pages/Register/Register';

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
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours">
          <Route index element={<AllTours />} loading />
          <Route path=":search" element={<AllTours />} loading />
        </Route>
        <Route path="/my-tour" element={<MyTour />} />
        <Route path="/detail/:id" element={<DetailTour />} />
        <Route path="confirmation/:id" element={<Confirmation />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="/cms" element={<CMSCustomer />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CMSDashBoard />} />
        <Route path="tours" element={<CMSTours />} />
        <Route path="add-tour" element={<CMSAddTour />} />
        <Route path="set-schedule/:id" element={<CMSTourSchedule />} />
      </Route>
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
