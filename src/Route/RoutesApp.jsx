import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login, Register } from '../pages';
import DetailTour from '../pages/DetailTour';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail" element={<DetailTour />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
