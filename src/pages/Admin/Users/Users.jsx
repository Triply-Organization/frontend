import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Space, Table } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import './Users.scss';

const { Title } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // sorter: (a, b) => a.title - b.title,
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
    // sorter: (a, b) => a.customer.length - b.customer.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    // sorter: (a, b) => a.duration - b.duration,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    // sorter: (a, b) => a.maxPeople - b.maxPeople,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    // sorter: (a, b) => a.minAge - b.minAge,
  },
  {
    title: 'Action',
    key: 'action',
    render: () => {
      return (
        <Space size={'middle'}>
          <Button type="primary">Edit</Button>
          <Button>Delete</Button>
        </Space>
      );
    },
  },
];
const data = [
  {
    name: 'a',
    avatar:
      'https://th.bing.com/th/id/OIP.ieXmGxEGTcqBcPcmthIaBgHaEW?pid=ImgDet&rs=1',
    email: '123@gmail.com',
    phone: '0123123123',
    address: '123 ASD BVCX',
  },
  {
    name: 'b',
    avatar: null,
    email: '542@gmail.com',
    phone: '012438123',
    address: '142 ASD BVCX',
  },
  {
    name: 'c',
    avatar:
      'https://th.bing.com/th/id/OIP.ieXmGxEGTcqBcPcmthIaBgHaEW?pid=ImgDet&rs=1',
    email: '55555@gmail.com',
    phone: '01234333223',
    address: '554 ASD BVCX',
  },
];

export default function Users() {
  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Title level={3}>Users</Title>
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
          <Button type="primary" size="large">
            Add new user
          </Button>
          <Table columns={columns} dataSource={data} />
        </Space>
      </div>
    </>
  );
}
