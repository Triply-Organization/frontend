import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Form,
  Image,
  List,
  Popconfirm,
  Rate,
  Space,
  Tag,
  message,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { userAPI } from '../../api/userAPI';
import { getConfirmInfo } from '../../app/checkoutSlice';
import ModalForm from '../../components/ModalForm/ModalForm';
import './MyTour.scss';

const MyTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idTourToReview, setIdTourToReview] = useState({});
  const [listOrder, setListOrder] = useState([]);
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  const loadingContext = useLoadingContext();
  const today = moment(new Date()).format('YYYY-MM-DD');
  const dispatch = useDispatch();
  const loading = async () => {
    const response = await userAPI.getOrderList();
    const { data } = response.data;
    setListOrder(data.orders);
    setUser(data.user);
  };
  useEffect(() => {
    loading();
    loadingContext.done();
  }, []);

  const [formReview] = Form.useForm();

  const handleReview = () => {
    formReview
      .validateFields()
      .then(async values => {
        values.rate.reviewAmentities = {
          rate: values.rate.reviewAmentities,
          id: 5,
        };
        values.rate.reviewLocation = {
          rate: values.rate.reviewLocation,
          id: 4,
        };
        values.rate.reviewServices = {
          rate: values.rate.reviewServices,
          id: 3,
        };
        values.rate.reviewPrices = {
          rate: values.rate.reviewPrices,
          id: 2,
        };
        values.rate.reviewRooms = {
          rate: values.rate.reviewRooms,
          id: 1,
        };
        await userAPI.addReview({
          body: values,
          id: idTourToReview.id,
        });
        loading();
        message.success('Comment this tour successful');
        setIsVisible(false);
        formReview.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleRefund = async value => {
    const req = {
      billId: value.bill.id,
      orderId: value.id,
      stripeId: value.bill.stripe,
      dayRemain: moment(moment(value.startDay.date).format('YYYY-MM-DD')).diff(
        moment(today),
        'days',
      ),
      currency: localStorage.getItem('currencyItem').toLowerCase(),
    };
    console.log(req);
    try {
      await userAPI.refundOrder(req);
      loading();
      message.success({ content: 'Refund Successful!', key: 'success' });
    } catch (error) {
      console.log(error);
      message.error({ content: 'Refund Failed!', key: 'failed' });
    }
  };

  const handleCheckout = value => {
    const req = value.id;
    console.log(req);
    dispatch(getConfirmInfo(req));
  };

  return (
    <div className="my-tour-wrapper">
      <div className="my-tour">
        <ModalForm
          form={formReview}
          title={`Review: ${idTourToReview?.title}`}
          isVisible={isVisible}
          handleOk={handleReview}
          handleCancel={() => setIsVisible(false)}
          cancelText="Cancel"
          okText="Submit"
        >
          <Form.Item
            label="Rating Room"
            name={['rate', 'reviewRooms']}
            rules={[{ required: true, message: 'Please rating here' }]}
          >
            <Rate allowHalf className="review__rating" />
          </Form.Item>
          <Form.Item
            label="Rating Price"
            name={['rate', 'reviewPrices']}
            rules={[{ required: true, message: 'Please rating here' }]}
          >
            <Rate allowHalf className="review__rating" />
          </Form.Item>
          <Form.Item
            label="Rating Services"
            name={['rate', 'reviewServices']}
            rules={[{ required: true, message: 'Please rating here' }]}
          >
            <Rate allowHalf className="review__rating" />
          </Form.Item>
          <Form.Item
            label="Rating Location"
            name={['rate', 'reviewLocation']}
            rules={[{ required: true, message: 'Please rating here' }]}
          >
            <Rate allowHalf className="review__rating" />
          </Form.Item>
          <Form.Item
            label="Rating Amentities"
            name={['rate', 'reviewAmentities']}
            rules={[{ required: true, message: 'Please rating here' }]}
          >
            <Rate allowHalf className="review__rating" />
          </Form.Item>
          <Form.Item label="Comment" name={'comment'}>
            <TextArea rows={3} />
          </Form.Item>
        </ModalForm>

        <h1 style={{ textAlign: 'center' }}>{t('my_tour.title')}</h1>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 3,
            defaultPageSize: 3,
            total: listOrder?.length,
            hideOnSinglePage: true,
          }}
          dataSource={listOrder}
          renderItem={item => {
            if (_.isEmpty(item.review)) {
              return (
                <List.Item
                  key={item.id}
                  actions={
                    item.status === 'paid' &&
                    moment(today).isAfter(
                      moment(item.startDay.date).format('YYYY-MM-DD'),
                    )
                      ? [
                          <Button
                            key={item.id}
                            type="primary"
                            onClick={() => {
                              setIsVisible(true);
                              setIdTourToReview({
                                id: item.id,
                                title: item.title,
                              });
                            }}
                          >
                            Review now
                          </Button>,
                        ]
                      : item.status === 'unpaid'
                      ? [
                          <Button
                            key={item.id}
                            type="primary"
                            onClick={() => handleCheckout(item)}
                          >
                            Checkout
                          </Button>,
                        ]
                      : null
                  }
                  extra={<Image width={272} alt="logo" src={item.cover} />}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={user.avatar} icon={<UserOutlined />} />
                    }
                    title={<b>{user.fullname}</b>}
                    description={moment(item.bookedAt.date).format(
                      'YYYY-MM-DD',
                    )}
                  />
                  <Space direction="vertical">
                    <p>
                      Tour: <Link to="#">{item.title}</Link>
                    </p>

                    <h3 className="my-tour__price">
                      {item.totalPrice?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </h3>

                    {item.status === 'unpaid' ? (
                      <Tag icon={<SyncOutlined spin />} color="processing">
                        Waiting checkout
                      </Tag>
                    ) : item.status === 'paid' &&
                      moment(today).isBefore(
                        moment(item.startDay.date).format('YYYY-MM-DD'),
                      ) ? (
                      <>
                        <Tag icon={<CheckCircleOutlined />} color="success">
                          Paid
                        </Tag>
                        <Popconfirm
                          title="Do you want to refund now?"
                          onConfirm={() => handleRefund(item)}
                          onCancel={() => console.log('cancle')}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary" danger>
                            Refund
                          </Button>
                        </Popconfirm>
                      </>
                    ) : item.status === 'refund' ? (
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        Refund
                      </Tag>
                    ) : null}
                  </Space>
                </List.Item>
              );
            } else {
              return (
                <List.Item
                  key={item.title}
                  extra={<Image width={272} alt="logo" src={item.cover} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={user.avatar} />}
                    title={<b>{user.fullname}</b>}
                    description={moment(item.bookedAt.date).format(
                      'YYYY-MM-DD',
                    )}
                  />
                  <Space direction="vertical">
                    <p>
                      Tour: <Link to="#">{item.title}</Link>
                    </p>

                    <h2 className="my-tour__price">
                      {item.price?.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </h2>

                    <Space>
                      <Tag icon={<CheckCircleOutlined />} color="success">
                        Paid
                      </Tag>
                      <Tag color="warning">Reviewed</Tag>
                    </Space>
                  </Space>
                  <p className="comment">{item.review.comment}</p>
                  <div className="rating-star-wrapper">
                    <Space>
                      <p>Room</p>
                      <Rate disabled defaultValue={item.review['0']?.rate} />
                    </Space>
                    <Space>
                      <p>Price</p>
                      <Rate disabled defaultValue={item.review['1']?.rate} />
                    </Space>
                    <Space>
                      <p>Services</p>
                      <Rate disabled defaultValue={item.review['2']?.rate} />
                    </Space>
                    <Space>
                      <p>Location</p>
                      <Rate disabled defaultValue={item.review['3']?.rate} />
                    </Space>
                    <Space>
                      <p>Amentities</p>
                      <Rate disabled defaultValue={item.review['4']?.rate} />
                    </Space>
                  </div>
                </List.Item>
              );
            }
          }}
        />
      </div>
    </div>
  );
};

export default MyTour;
