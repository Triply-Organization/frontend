/* eslint-disable no-undef */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Route, Routes } from 'react-router-loading';

import Header from '../../src/components/Header';

describe('component/Header', () => {
  beforeEach(() => {
    cy.viewport(1200, 700);
  });

  it('should render without crashing', () => {
    cy.mount(
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>,
    );
  });
});
