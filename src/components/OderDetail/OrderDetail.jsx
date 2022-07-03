import { Col, Divider, Image, Row, Typography } from 'antd';
import { PropTypes } from 'prop-types';
import React from 'react';

import './OrderDetail.scss';

const { Title, Text } = Typography;

const OrderDetail = props => {
  const { data, finalTotal, discountValue } = props;

  return (
    <>
      <Divider />
      <div className="checkout-info-display">
        <Row gutter={8}>
          <Col lg={8} md={6} sm={6} xs={0}>
            <Image width={150} src={data.images[1].path} />
          </Col>
          <Col lg={12} md={15} sm={15} xs={18}>
            <Title level={4}>{data.title}</Title>
            <section>
              <Text strong>Date: </Text>
              <Text>{data.date}</Text>
            </section>
            <section>
              <Text strong>Time: </Text>
              <Text>12:00 pm</Text>
            </section>
            <Text strong>Duration: </Text>
            <Text>{data.duration} days</Text>
            <section>
              <Text strong>Ticket:</Text>
            </section>
            <section className="checkout-info-display__ticket-ctn">
              {data.tickets.adult.quantity ? (
                <span>
                  <Text>Adult: </Text>
                  <Text strong>
                    ${data.tickets.adult.price} x {data.tickets.adult.quantity}
                  </Text>
                </span>
              ) : null}
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
                    ${data.tickets.children.price} x
                    {data.tickets.children.quantity}
                  </Text>
                </span>
              ) : null}
            </section>
          </Col>
          <Col lg={4} md={3} sm={3} xs={6}>
            <Title level={5}>${data.total}</Title>
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
              <Text strong>Discount</Text>
            </section>
            <section>
              <Title level={4}>Total</Title>
            </section>
          </Col>
          <Col lg={4} md={3} sm={3} xs={6}>
            <section>
              <Text strong>${data.total}</Text>
            </section>
            <section>
              <Text strong>{discountValue ? `-${discountValue}%` : '0%'}</Text>
            </section>
            <section>
              <Title level={4} className="result-payment">
                ${!finalTotal ? data.total : finalTotal}
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
  finalTotal: PropTypes.number,
  discountValue: PropTypes.number,
};

export default OrderDetail;
