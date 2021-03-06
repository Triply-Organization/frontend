/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Modal,
  Row,
  Space,
  Spin,
  Table,
} from 'antd';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { deleteCustomer, getAllCustomers } from '../../../app/AdminSlice';

const { confirm } = Modal;
const { Title } = Typography;

export default function Customers() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.admin.loading);
  const totalPages = useSelector(state => state.admin.customersData.totalPages);
  const customersData = useSelector(
    state => state.admin.customersData.customers,
  );
  const totalCustomers = useSelector(
    state => state.admin.customersData.totalCustomers,
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get('page') || 1);

  // FLAG PREVENT CALL API TWICE
  const [flag, setFlag] = useState(0);

  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    }
    dispatch(getAllCustomers(location.search));
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
      dispatch(getAllCustomers(location.search));
    }
  }, [page]);

  const showConfirm = record => {
    confirm({
      title: 'Do you really want to delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'Warning!',

      onOk() {
        // HANDLE DELETE CUSTOMER ACCOUNT
        dispatch(
          deleteCustomer({
            id: record.id,
            searchParams: location.search,
          }),
        );
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: avt => {
        return (
          <Avatar
            src={avt ? avt : null}
            size="large"
            icon={!avt ? <UserOutlined /> : null}
          />
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size={'middle'}>
            <Button onClick={() => showConfirm(record)}>Delete</Button>
          </Space>
        );
      },
    },
  ];

  return (
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
          <Title level={3}>Customers</Title>
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
                  total: totalCustomers,
                  // totalPages,
                  pageSize: 10,
                  showSizeChanger: false,
                  onChange: e => {
                    setPage(e);
                  },
                }}
                columns={columns}
                dataSource={customersData}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </Spin>
  );
}
