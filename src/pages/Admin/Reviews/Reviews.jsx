import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Col,
  Rate,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd';
import confirm from 'antd/lib/modal/confirm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { deleteReview, getAllReviews } from '../../../app/AdminSlice';
import './Reviews.scss';

const { Title } = Typography;

export default function Reviews() {
  const loadingContext = useLoadingContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const reviews = useSelector(state => state.admin.reviewsData.reviews);
  const isLoading = useSelector(state => state.admin.loading);
  const totalReviews = useSelector(
    state => state.admin.reviewsData.totalReviews,
  );

  const [page, setPage] = useState(searchParams.get('page') || 1);
  // FLAG PREVENT CALL API TWICE
  const [flag, setFlag] = useState(0);

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    }
    dispatch(getAllReviews(location.search));

    //call method to indicate that loading is done
    setTimeout(() => {
      loadingContext.done();
    }, 600);
  };

  useEffect(() => {
    loading();
    setFlag(flag + 1);
  }, []);

  useEffect(() => {
    if (flag !== 0) {
      setSearchParams({ page });
      dispatch(getAllReviews(location.search));
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
        dispatch(
          deleteReview({
            id: record.id,
            searchParams: location.search,
          }),
        );
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
      title: 'Tour Title',
      dataIndex: 'tourTitle',
      key: 'tourTitle',
      width: '20%',
      render: (_, record) => {
        return (
          <Link target="_blank" to={`/detail/${record.id}`}>
            {record.tourTitle}
          </Link>
        );
      },
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

  return (
    <>
      <Spin
        tip="loading..."
        spinning={isLoading}
        style={{
          marginTop: '100px',
        }}
      >
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
                    total: totalReviews,
                    // totalPages,
                    pageSize: 6,
                    showSizeChanger: false,
                    onChange: e => {
                      setPage(e);
                    },
                  }}
                  columns={columns}
                  dataSource={reviews}
                />
              </Col>
            </Row>
          </Space>
        </div>
      </Spin>
    </>
  );
}
