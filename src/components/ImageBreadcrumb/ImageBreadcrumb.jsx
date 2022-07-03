import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import './ImageBreadcrumb.scss';

const ImageBreadcrumb = props => {
  const { title, breadcrumbBg, currentPageTitle, beforePath } = props;
  return (
    <div className="breadcrumb">
      <img src={breadcrumbBg} alt="triply" className="breadcrumb-image" />
      <div className="breadcrumb-content">
        <h2 className="breadcrumb-content__title">{title}</h2>
        <Breadcrumb className="breadcrumb-content__breadcrumb">
          {beforePath.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <Link to={item.path}>{item.title}</Link>
              </Breadcrumb.Item>
            );
          })}

          <Breadcrumb.Item>{currentPageTitle}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
};

ImageBreadcrumb.propTypes = {
  title: PropTypes.string,
  breadcrumbBg: PropTypes.any,
  currentPageTitle: PropTypes.string,
  beforePath: PropTypes.array,
};

export default ImageBreadcrumb;
