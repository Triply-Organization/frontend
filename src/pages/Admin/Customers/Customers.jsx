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

import { getAllCustomers } from '../../../app/AdminSlice';

const { confirm } = Modal;
const { Title } = Typography;

export default function Customers() {
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.admin.customersData.loading);
  const totalPages = useSelector(state => state.admin.customersData.totalPages);
  const totalUsers = useSelector(state => state.admin.customersData.totalUsers);
  // const usersData = useSelector(state => state.admin.usersData.users)
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(searchParams.get('page') || 1);

  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    }

    // dispatch(getAllCustomers(location.search));
    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    loading();
  }, []);

  const showConfirm = record => {
    confirm({
      title: 'Do you really want to delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'Warning!',

      onOk() {
        // HANDLE DELETE CUSTOMER ACCOUNT
        console.log(record);
      },

      onCancel() {
        console.log('Cancel');
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

  const data = [
    {
      name: 'a',
      key: '1',
      avatar:
        'https://th.bing.com/th/id/OIP.ieXmGxEGTcqBcPcmthIaBgHaEW?pid=ImgDet&rs=1',
      email: '123@gmail.com',
      phone: '0123123123',
      address: '123 ASD BVCX',
    },
    {
      name: 'b',
      key: '2',
      avatar: null,
      email: '542@gmail.com',
      phone: '012438123',
      address: '142 ASD BVCX',
    },
    {
      name: 'c',
      key: '3',
      avatar:
        'https://th.bing.com/th/id/OIP.ieXmGxEGTcqBcPcmthIaBgHaEW?pid=ImgDet&rs=1',
      email: '55555@gmail.com',
      phone: '01234333223',
      address: '554 ASD BVCX',
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
                  totalPages,
                  total: totalUsers,
                  defaultCurrent: page,
                  showSizeChanger: false,
                  onChange: e => {
                    setPage(e);
                  },
                }}
                columns={columns}
                dataSource={data}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </Spin>
  );
}
