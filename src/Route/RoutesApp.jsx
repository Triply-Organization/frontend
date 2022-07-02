import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-loading';
import { topbar } from 'react-router-loading';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Admin from '../pages/Admin/Admin';
import { Dashboard } from '../pages/Admin/Dashboard/Dashboard';
import Tours from '../pages/Admin/Tours/Tours';
import AllTours from '../pages/Alltours/AllTours';
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
        <Route path="/home" element={<Home />} loading />
        <Route path="/tours">
          <Route index element={<AllTours />} loading />
          <Route path=":search" element={<AllTours />} loading />
        </Route>
        <Route path="/my-tour" element={<MyTour />} />
        <Route path="/detail/:id" element={<DetailTour />} />
        <Route path="confirmation/:id" element={<Confirmation />} />
      </Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tours" element={<Tours />} />
        <Route path="users" element={<h1>Users</h1>} />
        <Route path="customers" element={<h1>Customers</h1>} />
        <Route path="reviews" element={<h1>Reviews</h1>} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="checkout/:id" element={<Checkout />} />

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
