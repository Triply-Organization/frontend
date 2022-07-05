import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Form, Image, List, Rate, Space, Tag } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ModalForm from '../../components/ModalForm/ModalForm';
import './MyTour.scss';

const MyTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idTourToReview, setIdTourToReview] = useState({});
  const user = {
    id: '1',
    username: 'ddkhoa1206@gmail.com',
    fullname: 'Dang Khoa Duong',
    avatar: 'https://joeschmoe.io/api/v1/random',
  };
  const dataSource = [
    {
      title: 'Thailand Waterfall',
      id: 1,
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',

      bookedAt: '2022-07-05',
      status: 'unpaid',
      price: 100,
      review: {
        rating: 3.4,
        value:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      },
    },
    {
      title: 'Dalat Camping',
      id: 2,
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',

      bookedAt: '2022-07-05',
      status: 'paid',
      price: 100,
      review: {},
    },
    {
      title: 'Dalat Camping',
      id: 3,
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',

      bookedAt: '2022-07-05',
      status: 'refund',
      price: 100,
      review: {},
    },
    {
      title: 'Dalat Camping',
      id: 4,
      cover:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',

      bookedAt: '2022-07-05',
      status: 'refund',
      price: 100,
      review: {},
    },
  ];
  const [formReview] = Form.useForm();

  const handleReview = () => {
    formReview
      .validateFields()
      .then(values => {
        formReview.resetFields();
        console.log({ ...values, idTour: idTourToReview.id, userId: user.id });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
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
        <Form.Item label="Rating" name="rating" rules={[{ required: true }]}>
          <Rate allowHalf />
        </Form.Item>
        <Form.Item label="Comment" name={'comment'}>
          <TextArea size="large" rows={3} />
        </Form.Item>
      </ModalForm>
      <h1 style={{ textAlign: 'center' }}>My Tours</h1>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 3,
        }}
        dataSource={dataSource}
        renderItem={item => {
          if (_.isEmpty(item.review)) {
            return (
              <List.Item
                key={item.title}
                actions={
                  item.status === 'paid'
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
                        <Button key={item.id} type="primary">
                          Checkout
                        </Button>,
                      ]
                    : null
                }
                extra={<Image width={272} alt="logo" src={item.cover} />}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} />}
                  title={<b>{user.fullname}</b>}
                  description={item.bookedAt}
                />
                <Space direction="vertical">
                  <p>
                    Tour: <Link to="#">{item.title}</Link>
                  </p>

                  <h3 className="my-tour__price">
                    {item.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </h3>

                  {item.status === 'unpaid' ? (
                    <Tag icon={<SyncOutlined spin />} color="processing">
                      Waiting checkout
                    </Tag>
                  ) : item.status === 'paid' ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Paid
                    </Tag>
                  ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Refund
                    </Tag>
                  )}
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
                  description={item.bookedAt}
                />
                <Space direction="vertical">
                  <p>
                    Tour: <Link to="#">{item.title}</Link>
                  </p>

                  <h2 className="my-tour__price">
                    {item.price.toLocaleString('en-US', {
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

                  <p>{item.review.value}</p>
                  <Rate disabled defaultValue={item.review.rating} />
                </Space>
              </List.Item>
            );
          }
        }}
      />
    </div>
  );
};

export default MyTour;
