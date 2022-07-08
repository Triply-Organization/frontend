import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ role, children }) => {
  const { pathname } = useLocation();
  const roleLocalstorage = JSON.parse(localStorage.getItem('user'));
  const checkRole = role.some(r => roleLocalstorage.roles.includes(r));

  if (checkRole) {
    return children;
  } else {
    return <Navigate to="/404" state={{ from: pathname }} replace />;
  }
};

PrivateRoute.propTypes = {
  path: PropTypes.string,
  role: PropTypes.array,
  children: PropTypes.any,
};

export default PrivateRoute;
