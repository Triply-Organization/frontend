import { Col, Divider, Image, Row, Typography } from 'antd';
import React from 'react';

import './OrderDetail.scss';

const { Title, Text } = Typography;

const OrderDetail = () => {
  return (
    <>
      <Divider />
      <div className="checkout-info-display">
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
              <Text strong>Discount</Text>
            </section>
            <section>
              <Title level={5}>Amount Due</Title>
            </section>
          </Col>
          <Col lg={4} md={3} sm={3} xs={6}>
            <section>
              <Text strong>$138.00</Text>
            </section>
            <section>
              <Text strong>$138.00</Text>
            </section>
            <section>
              <Text strong>$0</Text>
            </section>
            <section>
              <Title level={5} className="result-payment">
                $138.00
              </Title>
            </section>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetail;
