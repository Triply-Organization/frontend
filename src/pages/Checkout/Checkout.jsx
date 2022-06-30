import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Typography,
} from 'antd';
import React from 'react';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import paypal from '../../assets/images/paypal-logo.png';
import { Header, ImageBreadcrumb, OrderDetail } from '../../components';
import './Checkout.scss';

const { Title } = Typography;

const Checkout = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Header />
      <ImageBreadcrumb
        title={'Checkout'}
        breadcrumbBg={breadcrumbBg}
        currentPageTitle={'CHECKOUT'}
        beforePath={[{ title: 'HOME', path: '/' }]}
      />
      <div className="ctn ctn-checkout">
        <div className="ctn-checkout__left-ctn">
          <div className="ctn-checkout__left-ctn__title">
            <Title level={2}>Order</Title>
          </div>
          <OrderDetail />
        </div>

        <div className="ctn-checkout__right-ctn">
          <div className="ctn-checkout__right-ctn__title">
            <Title level={2}>Contact information</Title>
          </div>
          <div className="ctn-checkout__right-ctn__form">
            <Form
              size="large"
              className="checkout-form"
              onFinish={onFinish}
              initialValues={{ payment: 'paypal', amount_pay: '138' }}
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
              <Form.Item
                name="amount_pay"
                label={<Title level={5}>Amount to Pay now </Title>}
              >
                <Radio.Group>
                  <Radio value="138">$138.00</Radio>
                </Radio.Group>
              </Form.Item>

              <Divider />

              <Title level={2} className="payment-title">
                Payment Method
              </Title>
              <Form.Item name="payment">
                <div>
                  <img className="paypal-img" src={paypal} alt="paypal" />
                  <Title level={5}>
                    Continue complete order and Pay with PayPal
                  </Title>
                </div>
              </Form.Item>

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
