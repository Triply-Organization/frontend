import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Rate,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import './Reviews.scss';

const { Title } = Typography;

export default function Reviews() {
  const loadingContext = useLoadingContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get('page') || 1);
  // FLAG PREVENT CALL API TWICE
  const [flag, setFlag] = useState(0);

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    }
    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    loading();
    setFlag(flag + 1);
  }, []);

  useEffect(() => {
    if (flag !== 0) {
      setSearchParams({ page });
      // dispatch(getTours(location.search));
    }
  }, [page]);

  // HANDLE SHOW CONFIRM
  const showConfirm = record => {
    confirm({
      title: 'Warning!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you really want to delete this comment?',

      onOk() {
        // HANDLE DELETE ACCOUNT
        console.log(record);
      },
    });
  };

  const columns = [
    {
      title: 'User email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
    },
    {
      title: 'Comment Content',
      dataIndex: 'comment',
      key: 'comment',
      render: text => <p className="reviews__comment">{text}</p>,
    },
    {
      title: 'Tour Name',
      dataIndex: 'tourName',
      key: 'tourName',
      width: '20%',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
      render: rating => {
        return (
          <Rate
            className="reviews__rating"
            allowHalf
            style={{ fontSize: '0.85rem' }}
            disabled
            defaultValue={rating}
          />
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return <Button onClick={() => showConfirm(record)}>Delete</Button>;
      },
    },
  ];
  const data = [
    {
      key: 1,
      email: 'a@gmail.com',
      createdAt: '2/2/2000',
      comment:
        'sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx',
      tourName: 'Long xuyen USA',
      rating: 3.5,
    },
    {
      key: 2,
      email: 'a@gmail.com',
      createdAt: '2/2/2000',
      comment:
        'sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx',
      tourName: 'Long xuyen USA',
      rating: 1.5,
    },
    {
      key: 3,
      email: 'a@gmail.com',
      createdAt: '2/2/2000',
      comment:
        'sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx',
      tourName: 'Long xuyen USA',
      rating: 2.5,
    },
    {
      key: 4,
      email: 'a@gmail.com',
      createdAt: '2/2/2000',
      comment:
        'sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx',
      tourName: 'Long xuyen USA',
      rating: 5,
    },
    {
      key: 5,
      email: 'a@gmail.com',
      createdAt: '2/2/2000',
      comment:
        'sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx sdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcxsdfxcvwq er fsdfxcvz ewrwqrwwqer wxvczcx',
      tourName: 'Long xuyen USA',
      rating: 4,
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Title level={3}>Reviews</Title>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: 360,
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            display: 'flex',
          }}
        >
          <Row>
            <Col span={24}>
              <Table
                size="large"
                pagination={{
                  current: page,
                  //  total: totalReviews,
                  pageSize: 6,
                  showSizeChanger: false,
                  onChange: e => {
                    setPage(e);
                  },
                }}
                bordered
                columns={columns}
                dataSource={data}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
}
