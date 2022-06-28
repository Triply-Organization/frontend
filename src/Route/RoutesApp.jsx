import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ChooseRole, Login, Register } from '../pages';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/choose-role" element={<ChooseRole />} />

      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
};

export default RoutesApp;
