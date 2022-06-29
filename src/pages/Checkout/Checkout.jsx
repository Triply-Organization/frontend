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
  Tabs,
  Typography,
} from 'antd';
import React from 'react';

// import breadcrumbBg from '../../assets/images/breadcrumb-bg.jpg';
import paypal from '../../assets/images/paypal-logo.png';
// import ImageBreadcrumb from '../../components/ImageBreadcrumb/ImageBreadcrumb';
import Footer from './../../components/Footer/Footer';
import Header from './../../components/Header/Header';
import './Checkout.scss';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Checkout = () => {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Header />
      {/* <ImageBreadcrumb
        title={'Checkout'}
        breadcrumbBg={breadcrumbBg}
        currentPageTitle={'CHECKOUT'}
        beforePath={[{ title: 'HOME', path: '/' }]}
      /> */}
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
                  src="https://demo2.pavothemes.com/triply/wp-content/uploads/2020/11/5c486ea739c52128a578315e_DSC04947-copy-150x150.jpg"
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
            <Form size="large" className="checkout-form" onFinish={onFinish}>
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

              <Title level={2} className="payment-title">
                Payment Method
              </Title>
              <Form.Item name="payment">
                <Tabs defaultActiveKey="1" type="card">
                  <TabPane tab={<Text>Pay later</Text>} key="1">
                    <Title level={5}>Book now, pay later!</Title>
                  </TabPane>
                  <TabPane tab={<Text>Paypal</Text>} key="2">
                    <div>
                      <img className="paypal-img" src={paypal} alt="paypal" />
                      <Title level={5}>
                        Continue complete order and Pay with PayPal
                      </Title>
                    </div>
                  </TabPane>
                </Tabs>
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
      <Footer />
    </>
  );
};

export default Checkout;
