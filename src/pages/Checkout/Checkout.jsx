import { Typography } from 'antd';
import React from 'react';

import './Checkout.scss';

const { Title } = Typography;

const Checkout = () => {
  return (
    <div className="ctn ctn-checkout">
      <div className="ctn-checkout__left-ctn">
        <Title level={2}>Order</Title>
      </div>
      <div className="ctn-checkout__right-ctn"></div>
    </div>
  );
};

export default Checkout;
