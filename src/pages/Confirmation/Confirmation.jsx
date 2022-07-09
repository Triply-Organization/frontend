import { Button, Result, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import { OrderDetail } from '../../components';
import { ImageBreadcrumb } from '../../components/';
import { getConfirmInfo } from './../../app/checkoutSlice';
import './Confirmation.scss';

const { Title, Text } = Typography;

const Confirmation = () => {
  const loadingContext = useLoadingContext();
  const { id } = useParams();
  const confirmInfo = useSelector(state => state.checkout.confirmationData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currencyString = localStorage.getItem('currencyString') || 'en-US';
  const currencyItem = localStorage.getItem('currencyItem') || 'USD';

  const handleBackToHome = () => {
    navigate('/');
    localStorage.removeItem('bookingInfo');
  };

  useEffect(() => {
    dispatch(getConfirmInfo(id));
    loadingContext.done();
  }, []);

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
            status={confirmInfo.status === 'unpaid' ? 'warning' : 'success'}
            title={
              confirmInfo.status === 'unpaid'
                ? 'Your Order is not Purchased'
                : 'Successfully Purchased'
            }
            subTitle={
              confirmInfo.status === 'unpaid'
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
              {confirmInfo?.id}
            </div>
            <div>
              <Text strong>Date:</Text>
              {moment(confirmInfo.startDay?.date).format('YYYY-MM-DD')}
            </div>
            <div>
              <Text strong>Total after VAT:</Text>
              {confirmInfo?.bill?.totalPrice
                ? confirmInfo?.bill?.totalPrice?.toLocaleString(
                    `${currencyString}`,
                    {
                      style: 'currency',
                      currency: `${currencyItem}`,
                    },
                  )
                : 'Unpaid Order'}
            </div>
          </div>
        </div>
        <div className="ctn-confirmation__order-details">
          <div className="ctn-confirmation__order-details__title">
            <Title level={3}>ORDER DETAILS</Title>
          </div>
          <OrderDetail data={confirmInfo} />
        </div>
      </div>
    </>
  );
};

export default Confirmation;
