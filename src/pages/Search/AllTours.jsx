import { Breadcrumb } from 'antd';
import React from 'react';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import Search from '../../components/Search/Search';
import './AllTours.scss';

const AllTours = () => {
  return (
    <div>
      <div className="breadcrumb-wrapper">
        <img src={breadcrumbBg} alt="triply" />
        <div className="breadcrumb-wrapper__content">
          <h2 className="breadcrumb-wrapper__content__title">All Tours</h2>
          <Breadcrumb className="breadcrumb-wrapper__content__breadcrumb">
            <Breadcrumb.Item>
              <a href="/">HOME</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>ALL TOURS</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Search />
      </div>
    </div>
  );
};

export default AllTours;
