import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Checkout, Confirmation, Login, Register } from '../pages';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="checkout/:id" element={<Checkout />} />
      <Route path="confirmation/:id" element={<Confirmation />} />

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
