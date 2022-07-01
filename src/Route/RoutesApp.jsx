import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import AllTours from '../pages/Alltours/AllTours';
import Checkout from '../pages/Checkout/Checkout';
import Confirmation from '../pages/Confirmation/Confirmation';
import DetailTour from '../pages/DetailTour/DetailTour';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import MyTour from '../pages/MyTour/MyTour';
import Register from '../pages/Register/Register';

const RoutesApp = () => {
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
        <Route path="/tours" element={<AllTours />} />
        <Route path="/my-tour" element={<MyTour />} />
        <Route path="/detail/:id" element={<DetailTour />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="confirmation/:id" element={<Confirmation />} />

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
