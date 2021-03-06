import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Modal, Space, Spin, Table, Tag } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getTours, updateTourStatus } from '../../../app/AdminSlice';

const { confirm } = Modal;
const { Title } = Typography;

export default function Tours() {
  const dispatch = useDispatch();
  const tours = useSelector(state => state.admin.toursData.tours);
  const isLoading = useSelector(state => state.admin.loading);
  const totalPages = useSelector(state => state.admin.toursData.totalPages);
  const totalTours = useSelector(state => state.admin.toursData.totalTours);

  // const page = useSelector();
  const [searchParams, setSearchParams] = useSearchParams();
  // GET PAGINATION ...
  const [page, setPage] = useState(searchParams.get('page') || 1);
  // GET TOUR DATA

  // FLAG PREVENT CALL API TWICE
  const [flag, setFlag] = useState(0);

  // Handle Approve Tour
  const handleApproveTour = record => {
    const request = {
      status: 'enable',
    };
    dispatch(
      updateTourStatus({
        id: record.id,
        body: JSON.stringify(request),
        searchParams: location.search,
      }),
    );
  };

  //Handle disable tour
  const handleDisableTour = record => {
    const request = {
      status: 'disabled',
    };
    dispatch(
      updateTourStatus({
        id: record.id,
        body: JSON.stringify(request),
        searchParams: location.search,
      }),
    );
  };

  // Handle able tour
  const handleEnableTour = record => {
    const request = {
      status: 'enable',
    };
    dispatch(
      updateTourStatus({
        id: record.id,
        body: JSON.stringify(request),
        searchParams: location.search,
      }),
    );
  };

  // Set loading context for PAGE
  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    } else {
      if (searchParams.get('page') > totalPages) {
        // setSearchParams({ page: totalPages });
      }
    }

    dispatch(getTours(location.search));

    //call method to indicate that loading is done
    setTimeout(() => {
      loadingContext.done();
    }, 600);
  };

  // HANDLE CONFIRM DISABLED
  const showConfirmDisabled = record => {
    confirm({
      title: 'Confirm!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you really want to change status to Disable?',

      onOk() {
        handleDisableTour(record);
      },
    });
  };

  // HANDLE CONFIRM APPROVE
  const showConfirmApproved = record => {
    confirm({
      title: 'Confirm!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you really want to approve this tour?',

      onOk() {
        handleApproveTour(record);
      },
    });
  };

  // HANDLE CONFIRM ENABLE
  const showConfirmEnabled = record => {
    confirm({
      title: 'Confirm!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you really want to change status to Enabled?',

      onOk() {
        handleEnableTour(record);
      },
    });
  };

  useEffect(() => {
    loading();
    setFlag(flag + 1);
  }, []);

  useEffect(() => {
    if (flag !== 0) {
      setSearchParams({ page });
      dispatch(getTours(location.search));
    }
  }, [page]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (_, record) => {
        return (
          <Link target="_blank" to={`/detail/${record.id}`}>
            {record.title}
          </Link>
        );
      },
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      sorter: (a, b) => a.customer.localeCompare(b.customer),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Max people',
      dataIndex: 'maxPeople',
      key: 'maxPeople',
      sorter: (a, b) => a.maxPeople - b.maxPeople,
    },
    {
      title: 'Min age',
      dataIndex: 'minAge',
      key: 'minAge',
      sorter: (a, b) => a.minAge - b.minAge,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => {
        switch (status) {
          case 'pending': {
            return (
              <Tag color="volcano" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          }
          case 'enable': {
            return (
              <Tag color="cyan" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          }
          case 'disabled': {
            return (
              <Tag color="magenta" key={status}>
                {status.toUpperCase()}
              </Tag>
            );
          }
        }
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (record.status === 'pending') {
          return (
            <Space size={'middle'}>
              <Button
                style={{ background: '#008000b3', color: '#fff' }}
                type="ghost"
                onClick={() => showConfirmApproved(record)}
              >
                Approve
              </Button>
              <Button onClick={() => showConfirmDisabled(record)}>
                Disable
              </Button>
            </Space>
          );
        } else if (record.status === 'disabled') {
          return (
            <Space size={'middle'}>
              <Button onClick={() => showConfirmEnabled(record)} type="primary">
                Enable
              </Button>
            </Space>
          );
        } else {
          return (
            <Button onClick={() => showConfirmDisabled(record)}>Disable</Button>
          );
        }
      },
    },
  ];
  return (
    <Spin
      spinning={isLoading}
      tip="loading..."
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
          <Title level={3}>Tours</Title>
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
          <Table
            size="large"
            pagination={{
              current: page,
              total: totalTours,
              // totalPages: totalPages,
              pageSize: 6,
              showSizeChanger: false,
              onChange: e => {
                setPage(e);
              },
            }}
            columns={columns}
            dataSource={tours}
          />
        </Space>
      </div>
    </Spin>
  );
}
