import { Col, Divider, Image, Row, Typography } from 'antd';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

import './OrderDetail.scss';

const { Title, Text } = Typography;

const OrderDetail = props => {
  const { data, finalTotal, discountValue, taxInfo, voucherCode } = props;
  const { t } = useTranslation();

  return (
    <>
      <Divider />
      <div className="checkout-info-display">
        <Row gutter={8}>
          <Col lg={8} md={6} sm={6} xs={0}>
            <Image
              data-testid="test-imageUrl"
              width={200}
              src={data?.imageTour?.path}
              className="img-order"
            />
          </Col>
          <Col
            lg={16}
            md={18}
            sm={18}
            xs={22}
            className="checkout-info-display__content"
          >
            <Title level={4}>{data?.tourTitle}</Title>
            <section>
              <Text strong>{t('checkout.order_detail.date')} </Text>
              <Text>{moment(data?.startDay?.date).format('YYYY-MM-DD')}</Text>
            </section>
            <section>
              <Text strong>{t('checkout.order_detail.time')} </Text>
              <Text>12:00 pm</Text>
            </section>
            <Text strong>{t('checkout.order_detail.duration')} </Text>
            <Text>{data?.duration} days</Text>
            <section>
              <Text strong>{t('checkout.order_detail.ticket.title')} </Text>
            </section>
            <section className="checkout-info-display__ticket-ctn">
              {data?.tickets?.adult ? (
                <span>
                  <Text>{t('checkout.order_detail.ticket.adult')} </Text>
                  <Text strong>
                    {data.tickets.adult.priceTick?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    x {data.tickets.adult.amount}
                  </Text>
                </span>
              ) : null}
              {data?.tickets?.youth ? (
                <span>
                  <Text>{t('checkout.order_detail.ticket.youth')}</Text>
                  <Text strong>
                    {data?.tickets?.youth.priceTick?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    x {data.tickets.youth.amount}
                  </Text>
                </span>
              ) : null}
              {data?.tickets?.children ? (
                <span>
                  <Text>{t('checkout.order_detail.ticket.children')}</Text>
                  <Text strong>
                    {data.tickets.children.priceTick?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}{' '}
                    x{data?.tickets?.children?.amount}
                  </Text>
                </span>
              ) : null}
            </section>
          </Col>
        </Row>
        <Divider />

        <Row gutter={8} className="ctn-result">
          <Col lg={9} md={6} sm={6} xs={0}></Col>
          <Col className="synthetic-price" lg={12} md={15} sm={15} xs={18}>
            <section>
              <Text strong>{t('checkout.order_detail.sub_total')}</Text>
            </section>
            <section>
              <Text strong>
                {data?.bill?.discount || discountValue
                  ? t('checkout.order_detail.discount')
                  : null}
              </Text>
            </section>
            <section>
              <Text strong>{voucherCode ? 'Voucher Applied' : null}</Text>
            </section>
            <section>
              <Text strong>{t('checkout.order_detail.tax')}</Text>
            </section>
            <section>
              <Title level={4}>{t('checkout.order_detail.total')}</Title>
            </section>
          </Col>
          <Col lg={3} md={3} sm={3} xs={6}>
            <section>
              <Text strong>
                {data?.subTotal?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </section>
            <section>
              <Text strong data-testid="text-discount">
                {data?.bill?.discount
                  ? data?.bill?.discount
                  : discountValue
                  ? `-${discountValue}%`
                  : null}
              </Text>
            </section>
            <section>
              <Text type="success">{voucherCode ? voucherCode : null}</Text>
            </section>
            <section>
              <Text strong>{taxInfo ? taxInfo : 8}%</Text>
            </section>
            <section>
              <Title
                level={4}
                className="result-payment"
                data-testid="text-finalTotal"
              >
                {!finalTotal?.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
                  ? data?.subTotal?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                  : finalTotal?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
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
  taxInfo: PropTypes.number,
  voucherCode: PropTypes.string,
};

export default OrderDetail;
