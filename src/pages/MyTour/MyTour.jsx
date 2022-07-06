import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Form,
  Image,
  List,
  Rate,
  Skeleton,
  Space,
  Tag,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { userAPI } from '../../api/userApi';
import ModalForm from '../../components/ModalForm/ModalForm';
import './MyTour.scss';

const MyTour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [idTourToReview, setIdTourToReview] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const loadingContext = useLoadingContext();

  useEffect(() => {
    const loadingData = async () => {
      //loading some data
      setLoading(true);
      try {
        const response = await userAPI.getAllOrder();
        const { data } = response;
        setLoading(true);
        setUser(data.data.user);
        setDataSource(data.data.orders);
      } catch (error) {
        console.log(error);
      }
      //call method to indicate that loading is done
      loadingContext.done();
    };

    loadingData();
  }, []);

  console.log(dataSource);

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
          defaultPageSize: 3,
          hideOnSinglePage: true,
          pageSize: 3,
          total: dataSource?.length,
        }}
        dataSource={dataSource}
        renderItem={item => {
          if (_.isEmpty(item.review)) {
            return (
              <Skeleton active loading={loading} style={{ margin: '3rem 0' }}>
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
                      {item?.price?.toLocaleString('en-US', {
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
              </Skeleton>
            );
          } else {
            return (
              <Skeleton active loading={loading} style={{ margin: '3rem 0' }}>
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
              </Skeleton>
            );
          }
        }}
      />
    </div>
  );
};

export default MyTour;
