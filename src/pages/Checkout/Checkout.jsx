import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Typography,
} from 'antd';
import React from 'react';

import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import paypal from '../../assets/images/paypal-logo.png';
import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import './Checkout.scss';

const { Title, Text } = Typography;

const Checkout = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
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
          <Divider />
          <div className="ctn-checkout__left-ctn__info-display">
            <Row gutter={8}>
              <Col lg={8} md={6} sm={6} xs={0}>
                <Image
                  width={150}
                  src="https://demo2.pavothemes.com/triply/wp-content/uploads/2020/11/5c486ea739c52128a578315e_DSC04947-copy-150x150.jpg"
                />
              </Col>
              <Col lg={12} md={15} sm={15} xs={18}>
                <Title level={4}>Caño Cristales River Trip</Title>
                <section>
                  <Text strong>Date: 06/30/2022</Text>
                </section>
                <Text strong>Duration:</Text> {'4 days'}
                <section>
                  <Text strong>Ticket:</Text>
                </section>
                <section>
                  <span>
                    <Text>Adultx1: </Text>
                    <Text strong>{'$138'}</Text>
                  </span>
                </section>
              </Col>
              <Col lg={4} md={3} sm={3} xs={6}>
                <Title level={5}>$0.00</Title>
              </Col>
            </Row>
            <Divider />
            <Row gutter={8}>
              <Col lg={8} md={6} sm={6} xs={0}></Col>
              <Col lg={12} md={15} sm={15} xs={18}>
                <section>
                  <Title level={5}> Service per booking</Title>
                </section>
                <section>
                  <Title level={5}>Service per person</Title>
                </section>
              </Col>
              <Col lg={4} md={3} sm={3} xs={6}>
                <section>
                  <Text strong>$138.00</Text>
                </section>
                <section>
                  <Text strong>$20.00</Text>
                </section>
              </Col>
            </Row>
            <Row gutter={8} className="ctn-result">
              <Col lg={8} md={6} sm={6} xs={0}></Col>
              <Col className="synthetic-price" lg={12} md={15} sm={15} xs={18}>
                <section>
                  <Text strong>Subtotal</Text>
                </section>
                <section>
                  <Text strong>Total</Text>
                </section>
                <section>
                  <Text strong>Amount Paid</Text>
                </section>
                <section>
                  <Title level={5}>Amount Due</Title>
                </section>
              </Col>
              <Col lg={4} md={3} sm={3} xs={6}>
                <section>
                  <Text strong>$158.00</Text>
                </section>
                <section>
                  <Text strong>$158.00</Text>
                </section>
                <section>
                  <Text strong>$0</Text>
                </section>
                <section>
                  <Title level={5} className="result-payment">
                    $158.00
                  </Title>
                </section>
              </Col>
            </Row>
          </div>
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
              initialValues={{ payment: 'paypal' }}
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
                name="amount"
                label={<Title level={5}>Amount to Pay now </Title>}
              >
                <Radio.Group>
                  <Radio value="50">$50.00</Radio>
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
