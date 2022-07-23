import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Tooltip,
  Typography,
  message,
} from 'antd';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadingContext } from 'react-router-loading';

import { axiosClient } from '../../api/config/axiosClient';
import { checkout, getVoucherInfo } from '../../app/checkoutSlice';
import { clearIdCheckout } from '../../app/orderSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.webp';
import paypal from '../../assets/images/paypal-logo.webp';
import stripe from '../../assets/images/stripe-logo.webp';
import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import OrderDetail from '../../components/OderDetail/OrderDetail';
import './Checkout.scss';

const { Title, Text } = Typography;

const Checkout = () => {
  const loadingContext = useLoadingContext();
  const checkoutData = JSON.parse(localStorage.getItem('bookingInfo'));
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const status = localStorage.getItem('status');
  const [taxInfo, setTaxInfo] = useState(0);
  const [finalTotal, setFinalTotal] = useState(
    checkoutData.subTotal + (checkoutData.subTotal * taxInfo) / 100,
  );
  const [discountValue, setDiscountValue] = useState(0);
  const [amountAdultTicket, setAmountAdultTicket] = useState(0);
  const [amountYouthTicket, setAmountYouthTicket] = useState(0);
  const [amountChidrenTicket, setAmountChildrenTicket] = useState(0);
  const [voucherVal, setVoucherVal] = useState('');
  const [voucherRemain, setVoucherRemain] = useState(0);
  const [voucherCode, setVoucherCode] = useState('');
  const loading = useSelector(state => state.checkout.loading);
  const voucherData = useSelector(state => state.checkout.voucher);
  const [formContact] = Form.useForm();
  const dispatch = useDispatch();
  const filterTimeout = useRef(null);
  const { t } = useTranslation();

  const onFinish = values => {
    const totalTicketAmount =
      amountAdultTicket + amountYouthTicket + amountChidrenTicket;
    const valueWithoutVoucher = {
      orderId: checkoutData.id,
      tourId: checkoutData.tourId,
      voucherId: null,
      scheduleId: checkoutData.scheduleId,
      totalPrice: finalTotal,
      discountPrice: 0,
      taxPrice: (checkoutData.subTotal * taxInfo) / 100,
      currency: 'usd',
      phone: values.phone,
      tourName: checkoutData.tourTitle,
      email: values.email,
      name: `${values.first_name} ${values.last_name}`,
      numberOfTickets: totalTicketAmount,
    };
    const newValues = {
      orderId: checkoutData.id,
      tourId: checkoutData.tourId,
      voucherId: voucherData.id,
      scheduleId: checkoutData.scheduleId,
      totalPrice: finalTotal,
      discountPrice: (checkoutData.subTotal * voucherData.discount) / 100,
      taxPrice: (checkoutData.subTotal * taxInfo) / 100,
      currency: 'usd',
      phone: values.phone,
      tourName: checkoutData.tourTitle,
      email: values.email,
      name: `${values.first_name} ${values.last_name}`,
      numberOfTickets: totalTicketAmount,
    };
    if (voucherRemain !== 0) {
      if (!values.discount) {
        dispatch(checkout(valueWithoutVoucher));
      } else {
        dispatch(checkout(newValues));
      }
    } else {
      message.error('Your voucher is expired!');
    }
  };

  useEffect(() => {
    if (checkoutData?.tickets?.adult?.amount) {
      setAmountAdultTicket(checkoutData?.tickets?.adult?.amount);
    }
    if (checkoutData?.tickets?.youth?.amount) {
      setAmountYouthTicket(checkoutData?.tickets?.youth?.amount);
    }
    if (checkoutData?.tickets?.children?.amount) {
      setAmountChildrenTicket(checkoutData?.tickets?.children?.amount);
    }
  }, [
    checkoutData?.tickets?.adult?.amount,
    checkoutData?.tickets?.youth?.amount,
    checkoutData?.tickets?.children?.amount,
  ]);

  useEffect(() => {
    dispatch(clearIdCheckout());
    const getTax = async () => {
      const url = '/taxes/getinfo?currency=vn';
      const res = await axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const taxData = res.data.data.percent;
      setTaxInfo(taxData);
    };
    getTax();
    document.title = 'Checkout';
    setTimeout(() => {
      loadingContext.done();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 600);
  }, []);

  useEffect(() => {
    setFinalTotal(
      checkoutData.subTotal + (checkoutData.subTotal * taxInfo) / 100,
    );
  }, [taxInfo]);

  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      const valueFormContact = {
        first_name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
      };

      formContact.setFieldsValue(valueFormContact);
    }
  }, []);

  useEffect(() => {
    setDiscountValue(voucherData.discount);
    setVoucherRemain(voucherData.remain);
    setVoucherCode(voucherData.code);
    if (voucherData.discount) {
      setFinalTotal(
        checkoutData.subTotal +
          (checkoutData.subTotal * taxInfo) / 100 -
          (checkoutData.subTotal * voucherData.discount) / 100,
      );
    } else if (!voucherData.id) {
      setFinalTotal(
        checkoutData.subTotal + (checkoutData.subTotal * taxInfo) / 100,
      );
    }
  }, [voucherData]);

  const handleChangInputVoucher = e => {
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }

    if (!e.target.value) {
      setVoucherVal('');
      setFinalTotal(
        checkoutData.subTotal + (checkoutData.subTotal * taxInfo) / 100,
      );
      setDiscountValue(0);
      setVoucherRemain('');
      setVoucherCode('');
    }

    filterTimeout.current = setTimeout(() => {
      setVoucherVal(e.target.value);
    }, 500);
  };

  const handleClickVoucherButton = () => {
    const req = {
      code: voucherVal,
    };
    dispatch(getVoucherInfo(req));
  };

  return (
    <>
      <ImageBreadcrumb
        title={'Checkout'}
        breadcrumbBg={breadcrumbBg}
        currentPageTitle={'CHECKOUT'}
        beforePath={[{ title: 'HOME', path: '/' }]}
      />
      <div className="ctn ctn-checkout">
        <div className="ctn-checkout__left-ctn">
          <div className="ctn-checkout__left-ctn__title">
            <Title level={2} className="title-id">
              {t('checkout.order_detail.title')} #{checkoutData.id}
            </Title>
            {status === 'refund' ? (
              <Text type="danger">
                You already refunded this tour. Booking unavailable!
              </Text>
            ) : status === 'paid' ? (
              <Text type="success">You already paid this tour</Text>
            ) : null}
          </div>
          <OrderDetail
            data={checkoutData}
            finalTotal={finalTotal}
            discountValue={discountValue}
            taxInfo={taxInfo}
            voucherCode={voucherCode}
            refundStatus={status}
          />
        </div>

        <div className="ctn-checkout__right-ctn">
          <div className="ctn-checkout__right-ctn__title">
            <Title level={2}>{t('checkout.contact_information.title')}</Title>
          </div>
          <div className="ctn-checkout__right-ctn__form">
            <Form
              form={formContact}
              layout="vertical"
              size="large"
              className="checkout-form"
              onFinish={onFinish}
              initialValues={{
                payment: 'stripe',
              }}
            >
              <Form.Item
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input
                  placeholder={t('checkout.contact_information.first_name')}
                />
              </Form.Item>
              <Form.Item
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input
                  placeholder={t('checkout.contact_information.last_name')}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'This field is not valid E-mail.',
                  },
                  {
                    required: true,
                    message: 'This field is required.',
                  },
                ]}
              >
                <Input placeholder={t('checkout.contact_information.email')} />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    pattern: /^(?:\d*)$/,
                    message: 'Input should contain just number!',
                  },
                  {
                    required: true,
                    message: 'This field is required',
                  },
                ]}
              >
                <Input placeholder={t('checkout.contact_information.phone')} />
              </Form.Item>

              <Title level={2} className="payment-title">
                {t('checkout.contact_information.payment')}
              </Title>

              <Form.Item name="payment">
                <Radio.Group>
                  <Radio value="stripe">
                    <div>
                      <img className="stripe-img" src={stripe} alt="stripe" />
                    </div>
                  </Radio>
                  <Radio value="paypal" disabled>
                    <Tooltip title="System will update later">
                      <div>
                        <img className="paypal-img" src={paypal} alt="paypal" />
                      </div>
                    </Tooltip>
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="discount"
                label={
                  <Title level={5}>
                    {t('checkout.contact_information.voucher_notify')}
                  </Title>
                }
                rules={[
                  {
                    pattern: /^[A-Z]*$/,
                    message: "Please uppercase the voucher's code",
                  },
                ]}
              >
                <Row gutter={[8, 8]}>
                  <Col lg={18} md={18} sm={24} xs={24}>
                    <Form.Item name="discount" noStyle>
                      <Input
                        allowClear
                        placeholder={t('checkout.contact_information.voucher')}
                        onChange={handleChangInputVoucher}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={6} md={6} sm={24} xs={24}>
                    <Button
                      disabled={voucherVal === '' ? true : false}
                      onClick={handleClickVoucherButton}
                      className="voucher-btn"
                    >
                      {t('cta.apply')}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>

              <Divider />

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('Should accept agreement')),
                  },
                ]}
              >
                <Checkbox>
                  {t('checkout.contact_information.agreement')}{' '}
                  <a href="">agreement</a>
                </Checkbox>
              </Form.Item>

              {status === 'refund' ? (
                <Form.Item>
                  <Button
                    danger
                    type="primary"
                    className="button-checkout-page"
                  >
                    You are refuned
                  </Button>
                </Form.Item>
              ) : status === 'paid' ? (
                <Form.Item>
                  <Button type="dashed" className="button-checkout-page">
                    You already paid this tour
                  </Button>
                </Form.Item>
              ) : (
                <Form.Item>
                  <Button
                    loading={loading}
                    htmlType="submit"
                    type="primary"
                    className="button-checkout-page"
                  >
                    {t('cta.complete_order')}
                  </Button>
                </Form.Item>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
