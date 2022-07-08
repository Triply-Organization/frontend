import React from 'react';
import { Link } from 'react-router-dom';

import page404 from '../../assets/images/404.png';
import './Page404.scss';

export function Page404() {
  return (
    <div className="page404-ctn">
      <div className="page404-wrapper">
        <img src={page404} alt="404" className="page404-img" />
        <h1 className="page404-heading">Oops! Look like you’re lost</h1>
        <p className="page404-content">
          Page does not exist or some other error occured. Go to our{' '}
          <Link className="page404-link" to="/">
            Home page
          </Link>
        </p>
      </div>
    </div>
  );
}
