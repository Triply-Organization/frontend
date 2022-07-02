import { Breadcrumb, Button, Space, Table, Tag } from 'antd';
import { Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './Tours.scss';

const { Title } = Typography;

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
    // sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    // sorter: (a, b) => a.customer.length - b.customer.length,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    key: 'duration',
    // sorter: (a, b) => a.duration - b.duration,
  },
  {
    title: 'Max people',
    dataIndex: 'maxPeople',
    key: 'maxPeople',
    // sorter: (a, b) => a.maxPeople - b.maxPeople,
  },
  {
    title: 'Min age',
    dataIndex: 'minAge',
    key: 'minAge',
    // sorter: (a, b) => a.minAge - b.minAge,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    // sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    // sorter: (a, b) => a.createdAt - b.createdAt,
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
        case 'disabled': {
          return (
            <Tag color="magenta" key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        }
      }
    },
    // sorter: (a, b) => a.tag - b.tag,
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
      } else if (record.tag === 'disabled') {
        return (
          <Space size={'middle'}>
            <Button type="primary">Able</Button>
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
    id: 1,
    title: 'a',
    customer: 'q',
    duration: 4,
    maxPeople: 52,
    minAge: 10,
    price: 10,
    createdAt: '1/1/2000',
    tag: 'processing',
  },
  {
    key: '2',
    id: 2,
    title: 'b',
    customer: 'w',
    duration: 12,
    maxPeople: 54,
    minAge: 11,
    price: 33,
    createdAt: '1/1/2000',
    tag: 'disabled',
  },
  {
    key: '3',
    id: 3,
    title: 'c',
    customer: 'e',
    duration: 33,
    maxPeople: 55,
    minAge: 2,
    price: 44,
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
