import { Col, Divider, Image, Row, Typography } from 'antd';
import { PropTypes } from 'prop-types';
import React from 'react';

import './OrderDetail.scss';

const { Title, Text } = Typography;

const OrderDetail = props => {
  const { data } = props;
  console.log(data);
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
            <Title level={4}>{data.title}</Title>
            <section>
              <Text strong>Date: </Text>
              {data.date}
            </section>
            <Text strong>Duration: </Text>
            {data.duration} days
            <section>
              <Text strong>Ticket:</Text>
            </section>
            <section className="checkout-info-display__ticket-ctn">
              {data.tickets.adult.quantity && (
                <span>
                  <Text>Adult: </Text>
                  <Text strong>
                    ${data.tickets.adult.price} x {data.tickets.adult.quantity}
                  </Text>
                </span>
              )}
              {data.tickets.youth.quantity ? (
                <span>
                  <Text>Youth</Text>
                  <Text strong>
                    ${data.tickets.youth.price} x {data.tickets.youth.quantity}
                  </Text>
                </span>
              ) : null}
              {data.tickets.children.quantity ? (
                <span>
                  <Text>Children: </Text>
                  <Text strong>
                    ${data.tickets.children.price} x{' '}
                    {data.tickets.children.quantity}
                  </Text>
                </span>
              ) : null}
            </section>
          </Col>
          <Col lg={4} md={3} sm={3} xs={6}>
            <Title level={5}>
              {/* {data.tickets.adult.price +
                data.tickets.youth.price +
                data.tickets.children.price} */}
              $0.00
            </Title>
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
              <Text strong>$0.00</Text>
            </section>
            <section>
              <Text strong>$0.00</Text>
            </section>
            <section>
              <Text strong>$0.00</Text>
            </section>
            <section>
              <Title level={5} className="result-payment">
                $0.00
              </Title>
            </section>
          </Col>
        </Row>
      </div>
    </>
  );
};

OrderDetail.propTypes = {
  data: PropTypes.object,
};

export default OrderDetail;
