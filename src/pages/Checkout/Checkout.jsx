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
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkout, getVoucherInfo } from '../../app/checkoutSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import paypal from '../../assets/images/paypal-logo.png';
import stripe from '../../assets/images/stripe-logo.png';
import { ImageBreadcrumb, OrderDetail } from '../../components';
import './Checkout.scss';

const { Title } = Typography;

const Checkout = () => {
  const checkoutData = JSON.parse(localStorage.getItem('bookingInfo'));
  const [finalTotal, setFinalTotal] = useState(checkoutData.subTotal);
  const [discountValue, setDiscountValue] = useState(0);
  const [voucherVal, setVoucherVal] = useState('');
  const loading = useSelector(state => state.checkout.loading);
  const voucherData = useSelector(state => state.checkout.voucher);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const filterTimeout = useRef(null);

  const onFinish = values => {
    const valueWithoutVoucher = {
      orderId: checkoutData.id,
      tourId: checkoutData.tourId,
      voucherId: null,
      scheduleId: checkoutData.scheduleId,
      totalPrice: finalTotal,
      discountPrice: 0,
      taxPrice: checkoutData.tax.percent,
      // currency: localStorage.getItem('currencyItem').toLowerCase(),
      currency: 'usd',
      phone: values.phone,
      tourName: checkoutData.tourTitle,
      email: values.email,
      name: `${values.first_name} ${values.last_name}`,
    };
    const newValues = {
      orderId: checkoutData.id,
      tourId: checkoutData.tourId,
      voucherId: voucherData.id,
      scheduleId: checkoutData.scheduleId,
      totalPrice: finalTotal,
      discountPrice: voucherData.discount,
      taxPrice: checkoutData.tax.percent,
      // currency: localStorage.getItem('currencyItem').toLowerCase(),
      currency: 'usd',
      phone: values.phone,
      tourName: checkoutData.tourTitle,
      email: values.email,
      name: `${values.first_name} ${values.last_name}`,
    };
    if (voucherData.remain !== 0) {
      if (!values.discount) {
        console.log(valueWithoutVoucher);
        dispatch(checkout(valueWithoutVoucher));
      } else {
        console.log(newValues);
        dispatch(checkout(newValues));
      }
    } else {
      message.error('Your voucher is expired!');
    }
  };

  useEffect(() => {
    setDiscountValue(voucherData.discount);
    if (voucherData.discount) {
      setFinalTotal(
        checkoutData.subTotal -
          (checkoutData.subTotal * voucherData.discount) / 100,
      );
    } else if (!voucherData.discount) {
      setFinalTotal(checkoutData.subTotal);
    }
  }, [voucherData]);

  const handleChangInputVoucher = e => {
    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current);
    }

    if (!e) return setVoucherVal('');

    filterTimeout.current = setTimeout(() => {
      setVoucherVal(e.target.value);
    }, 500);
  };

  const handleClickVoucherButton = () => {
    console.log(voucherVal);
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
            <Title level={2}>Order #{checkoutData.id}</Title>
          </div>
          <OrderDetail
            data={checkoutData}
            finalTotal={finalTotal}
            discountValue={discountValue}
          />
        </div>

        <div className="ctn-checkout__right-ctn">
          <div className="ctn-checkout__right-ctn__title">
            <Title level={2}>Contact information</Title>
          </div>
          <div className="ctn-checkout__right-ctn__form">
            <Form
              form={form}
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
                <Input placeholder="First name" />
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
                <Input placeholder="Last name" />
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
                <Input placeholder="Email" />
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
                <Input placeholder="Contact number" />
              </Form.Item>

              <Title level={2} className="payment-title">
                Payment Method
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
                label={<Title level={5}>Apply your voucher to discount!</Title>}
                rules={[
                  {
                    pattern: /^[A-Z]*$/,
                    message: "Please uppercase the voucher's code",
                  },
                ]}
              >
                <Row gutter={8}>
                  <Col span={19}>
                    <Form.Item name="discount" noStyle>
                      <Input
                        placeholder="VOUCHER CODE"
                        onChange={handleChangInputVoucher}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
                    <Button onClick={handleClickVoucherButton}>Apply</Button>
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
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  htmlType="submit"
                  type="primary"
                  className="button-checkout-page"
                >
                  Complete My Order
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
