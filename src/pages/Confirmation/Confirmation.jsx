import { Result, Typography } from 'antd';
import React from 'react';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import { OrderDetail } from '../../components';
import { ImageBreadcrumb } from '../../components/';
import './Confirmation.scss';

const { Title, Text } = Typography;

const Confirmation = () => {
  return (
    <>
      <ImageBreadcrumb
        title={'Confirmation'}
        breadcrumbBg={breadcrumbBg}
        currentPageTitle={'CONFIRMATION'}
        beforePath={[{ title: 'HOME', path: '/' }]}
      />
      <div className="ctn ctn-confirmation">
        <div className="ctn-confirmation__notification">
          <Result
            status="success"
            title="Successfully Purchased"
            subTitle="Your order is completed and received, and a confirmation email was sent to you. You will pay the full amount later. Thank you!"
          />
        </div>
        <div className="ctn-confirmation__order-info">
          <div className="ctn-confirmation__order-info__content">
            <div>
              <Text strong>Order number:</Text>
              {'220630-060956147'}
            </div>
            <div>
              <Text strong>Date:</Text>
              {'2022-07-02 12:00'}
            </div>
            <div>
              <Text strong>Total:</Text>
              {'$100.00'}
            </div>
          </div>
        </div>
        <div className="ctn-confirmation__order-details">
          <div className="ctn-confirmation__order-details__title">
            <Title level={3}>ORDER DETAILS</Title>
          </div>
          <OrderDetail />
        </div>
      </div>
    </>
  );
};

export default Confirmation;
