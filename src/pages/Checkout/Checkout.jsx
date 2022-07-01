import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Radio,
  Select,
  Typography,
} from 'antd';
import React from 'react';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import stripe from '../../assets/images/stripe-logo.png';
import { ImageBreadcrumb, OrderDetail } from '../../components';
import './Checkout.scss';

const { Title } = Typography;
const { Option } = Select;

const Checkout = () => {
  const [form] = Form.useForm();
  const onFinish = values => {
    const newValues = {
      ...values,
      name: ` ${values.first_name} ${values.last_name}`,
    };
    console.log('Received values of form: ', newValues);
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
              form={form}
              layout="vertical"
              size="large"
              className="checkout-form"
              onFinish={onFinish}
              initialValues={{ payment: 'stripe', amount_pay: '138' }}
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

              <Form.Item
                name="discount"
                label={<Title level={5}>Apply your voucher to discount!</Title>}
              >
                <Select allowClear mode="multiple">
                  <Option value="voucher_1">KAKA</Option>
                  <Option value="voucher_2">HUHU</Option>
                  <Option value="voucher_3">HAHA</Option>
                </Select>
              </Form.Item>

              <Divider />

              <Title level={2} className="payment-title">
                Payment Method
              </Title>
              <Form.Item name="payment">
                <div>
                  <img className="paypal-img" src={stripe} alt="stripe" />
                  <Title level={5}>
                    Continue complete order and Pay with Stripe
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
