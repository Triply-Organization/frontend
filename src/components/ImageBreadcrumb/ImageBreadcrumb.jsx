import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

import './ImageBreadcrumb.scss';

const ImageBreadcrumb = props => {
  const { title, breadcrumbBg, currentPageTitle, beforePath } = props;
  return (
    <>
      <img src={breadcrumbBg} alt="triply" className="breadcrumb-image" />
      <div className="breadcrumb-content">
        <h2 className="breadcrumb-content__title">{title}</h2>
        <Breadcrumb className="breadcrumb-content__breadcrumb">
          {beforePath.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <a href={item.path}>{item.title}</a>
              </Breadcrumb.Item>
            );
          })}

          <Breadcrumb.Item>{currentPageTitle}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </>
  );
};

ImageBreadcrumb.propTypes = {
  title: PropTypes.string,
  breadcrumbBg: PropTypes.any,
  currentPageTitle: PropTypes.string,
  beforePath: PropTypes.array,
};

export default ImageBreadcrumb;
