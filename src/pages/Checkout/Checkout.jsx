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

import './Checkout.scss';

const { Title, Text } = Typography;

const Checkout = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="ctn ctn-checkout">
      <div className="ctn-checkout__left-ctn">
        <div className="ctn-checkout__left-ctn__title">
          <Title level={2}>Order</Title>
        </div>
        <Divider />
        <div className="ctn-checkout__left-ctn__info-display">
          <Row gutter={8}>
            <Col span={8}>
              <Image
                width={150}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Col>
            <Col span={12}>
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
            <Col span={4}>
              <Title level={5}>$0.00</Title>
            </Col>
          </Row>
          <Divider />
          <Row gutter={8}>
            <Col span={8}></Col>
            <Col span={12}>
              <Title level={5}> Service per booking</Title>
            </Col>
            <Col span={4}>
              <Text strong>$138.00</Text>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={8}></Col>
            <Col span={12}>
              <Title level={5}>Service per person</Title>
            </Col>
            <Col span={4}>
              <Text strong>$20.00</Text>
            </Col>
          </Row>
          <Row gutter={8} className="ctn-result">
            <Col span={8}></Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <section>
                <Title level={5}>Subtotal</Title>
              </section>
              <section>
                <Title level={5}>Total</Title>
              </section>
              <section>
                <Title level={5}>Amount Paid</Title>
              </section>
              <section>
                <Title level={5}>Amount Due</Title>
              </section>
            </Col>
            <Col span={4}>
              <section>
                <Title level={5}>$158.00</Title>
              </section>
              <section>
                <Title level={5}>$158.00</Title>
              </section>
              <section>
                <Title level={5}>$0</Title>
              </section>
              <section>
                <Title level={4} className="result-payment">
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
            name="normal_login"
            className="login-form"
            onFinish={onFinish}
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
              <Radio value="50">$50.00</Radio>
            </Form.Item>

            <Divider />

            <Title level={2}>Payment Method</Title>

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
              <Button htmlType="submit" type="primary">
                Complete My Order
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
