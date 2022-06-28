/* eslint-disable react/prop-types */
import React from 'react';

import './Subnav.scss';

export default function Subnav(props) {
  const { subnavItem } = props;
  return (
    <>
      {subnavItem.length === 0 ? null : (
        <div className="header__subnav-wrapper">
          <ul className="header__subnav">
            {subnavItem.map((item, index) => {
              return (
                <li className="header__subnav-item" key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
