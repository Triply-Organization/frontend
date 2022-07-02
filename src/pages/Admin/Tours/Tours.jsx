import { Breadcrumb, Button, Space, Table, Tag } from 'antd';
import { Typography } from 'antd';
import React from 'react';

import './Tours.scss';

const { Title } = Typography;

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: 'Max people',
    dataIndex: 'maxPeople',
    key: 'maxPeople',
  },
  {
    title: 'Min age',
    dataIndex: 'minAge',
    key: 'minAge',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: 'Tag',
    key: 'tag',
    dataIndex: 'tag',
    render: tag => {
      switch (tag) {
        case 'processing': {
          return (
            <Tag color="volcano" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }
        case 'approved': {
          return (
            <Tag color="cyan" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }
      }
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => {
      if (record.tag === 'processing') {
        return (
          <Space size={'middle'}>
            <Button type="primary">Approved</Button>
            <Button>Disable</Button>
          </Space>
        );
      } else {
        return <Button>Disable</Button>;
      }
    },
  },
];
const data = [
  {
    key: '1',
    title: 'du lich',
    customer: 'duy',
    duration: 4,
    maxPeople: 5,
    minAge: 10,
    price: 10,
    createdAt: '1/1/2000',
    tag: 'processing',
  },
  {
    key: '2',
    title: 'du lich',
    customer: 'duy',
    duration: 4,
    maxPeople: 5,
    minAge: 10,
    price: 10,
    createdAt: '1/1/2000',
    tag: 'processing',
  },
  {
    key: '3',
    title: 'du lich',
    customer: 'duy',
    duration: 4,
    maxPeople: 5,
    minAge: 10,
    price: 10,
    createdAt: '1/1/2000',
    tag: 'approved',
  },
];

export default function Tours() {
  return (
    <>
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
          <Table columns={columns} dataSource={data} />
        </Space>
      </div>
    </>
  );
}
