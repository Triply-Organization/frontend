import { Button, Result, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import { OrderDetail } from '../../components';
import { ImageBreadcrumb } from '../../components/';
import './Confirmation.scss';

const { Title, Text } = Typography;

const Confirmation = () => {
  const checkoutData = JSON.parse(localStorage.getItem('bookingInfo'));
  const navigate = useNavigate();
  console.log(checkoutData);

  const handleBackToHome = () => {
    navigate('/');
    localStorage.removeItem('bookingInfo');
  };
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
            status={checkoutData.status !== 'unpaid' ? 'warning' : 'success'}
            title={
              checkoutData.status !== 'unpaid'
                ? 'Your Order is not Purchased'
                : 'Successfully Purchased'
            }
            subTitle={
              checkoutData.status !== 'unpaid'
                ? 'Please payment your order'
                : 'Your order is completed and received, and a confirmation email was sent to you. You will pay the full amount later. Thank you!'
            }
            extra={[
              <Button type="primary" key="console" onClick={handleBackToHome}>
                Back to Home
              </Button>,
            ]}
          />
        </div>
        <div className="ctn-confirmation__order-info">
          <div className="ctn-confirmation__order-info__content">
            <div>
              <Text strong>Order number:</Text>
              {checkoutData.id}
            </div>
            <div>
              <Text strong>Date:</Text>
              {moment(checkoutData.startDay.date).format('YYYY-MM-DD')}
            </div>
            <div>
              <Text strong>Total:</Text>
              {checkoutData.subTotal}
            </div>
          </div>
        </div>
        <div className="ctn-confirmation__order-details">
          <div className="ctn-confirmation__order-details__title">
            <Title level={3}>ORDER DETAILS</Title>
          </div>
          <OrderDetail data={checkoutData} />
        </div>
      </div>
    </>
  );
};

export default Confirmation;
