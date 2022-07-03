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
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkout } from '../../app/checkoutSlice';
import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import stripe from '../../assets/images/stripe-logo.png';
import { ImageBreadcrumb, OrderDetail } from '../../components';
import './Checkout.scss';

const { Title } = Typography;
const { Option } = Select;

const Checkout = () => {
  const checkoutData = JSON.parse(localStorage.getItem('bookingTour'));
  const [form] = Form.useForm();
  const [finalTotal, setFinalTotal] = useState(checkoutData.total);
  const [discountValue, setDiscountValue] = useState(0);
  const dispatch = useDispatch();
  const loading = useSelector(state => state.checkout.loading);
  // const url = useSelector(state => state.checkout.data);

  const onFinish = values => {
    const newValues = {
      email: values.email,
      tourId: checkoutData.id,
      date: checkoutData.date,
      orderDetails: 1,
      amount: finalTotal,
      currency: 'usd',
      phone: values.phone,
      name: `${values.first_name} ${values.last_name}`,
    };
    console.log('Received values of form: ', newValues);
    dispatch(checkout(newValues));
  };

  const voucherDiscount = [
    {
      title: 'KAKA',
      value: 10,
    },
    { title: 'HUHU', value: 20 },
    { title: 'HAHA', value: 30 },
  ];

  const handleChangeFinalTotal = value => {
    console.log(value);
    setDiscountValue(value);
    if (voucherDiscount && voucherDiscount.length > 0) {
      setFinalTotal(checkoutData.total - (checkoutData.total * value) / 100);
    } else if (!value) {
      setFinalTotal(checkoutData.total);
    }
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
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="discount"
                label={<Title level={5}>Apply your voucher to discount!</Title>}
              >
                <Select
                  allowClear
                  onChange={handleChangeFinalTotal}
                  placeholder="Choose your voucher"
                >
                  {voucherDiscount.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
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
