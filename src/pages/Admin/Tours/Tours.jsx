import { Breadcrumb, Button, Space, Table, Tag } from 'antd';
import { Typography } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

const { Title } = Typography;

export default function Tours() {
  // GET PAGINATION ...

  // GET TOUR DATA

  // Handle Approve Tour
  const handleApproveTour = record => {
    console.log('APPROVE: ', record);
  };

  //Handle disable tour
  const handleDisableTour = record => {
    console.log('DISABLE: ', record);
  };

  // Handle able tour
  const handleAbleTour = record => {
    console.log('ABLE: ', record);
  };

  // Set loading context for PAGE
  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data

    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    loading();
  }, []);
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
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
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
      sorter: (a, b) => a.tag.localeCompare(b.tag),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        if (record.tag === 'processing') {
          return (
            <Space size={'middle'}>
              <Button type="primary" onClick={() => handleApproveTour(record)}>
                Approved
              </Button>
              <Button onClick={() => handleDisableTour(record)}>Disable</Button>
            </Space>
          );
        } else if (record.tag === 'disabled') {
          return (
            <Space size={'middle'}>
              <Button
                onClick={() => handleAbleTour(record)}
                type="ghost"
                style={{ background: '#008000b3', color: '#fff' }}
              >
                Able
              </Button>
            </Space>
          );
        } else {
          return (
            <Button onClick={() => handleDisableTour(record)}>Disable</Button>
          );
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
      createdAt: '1-11-2019',
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
      createdAt: '1-3-2019',
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
      createdAt: '1-2-2019',
      tag: 'approved',
    },
    {
      key: '4',
      id: 4,
      title: 'asd',
      customer: 'qzxcq',
      duration: 5,
      maxPeople: 52,
      minAge: 10,
      price: 10,
      createdAt: '11-2-2019',
      tag: 'processing',
    },
    {
      key: '5',
      id: 5,
      title: 'sb',
      customer: 'w',
      duration: 12,
      maxPeople: 54,
      minAge: 11,
      price: 33,
      createdAt: '9-3-2019',
      tag: 'disabled',
    },
    {
      key: '6',
      id: 6,
      title: 'ca',
      customer: 'e',
      duration: 33,
      maxPeople: 55,
      minAge: 2,
      price: 44,
      createdAt: '13-5-2020',
      tag: 'approved',
    },
    {
      key: '7',
      id: 7,
      title: 'aza',
      customer: 'q',
      duration: 4,
      maxPeople: 52,
      minAge: 10,
      price: 10,
      createdAt: '11-11-2019',
      tag: 'processing',
    },
    {
      key: '8',
      id: 8,
      title: 'lb',
      customer: 'w',
      duration: 12,
      maxPeople: 54,
      minAge: 11,
      price: 33,
      createdAt: '3-3-2019',
      tag: 'disabled',
    },
    {
      key: '9',
      id: 9,
      title: 'c',
      customer: 'e',
      duration: 33,
      maxPeople: 55,
      minAge: 2,
      price: 44,
      createdAt: '11-2-2019',
      tag: 'approved',
    },
    {
      key: '10',
      id: 10,
      title: 'asc',
      customer: 'e',
      duration: 33,
      maxPeople: 55,
      minAge: 2,
      price: 44,
      createdAt: '1-2-2019',
      tag: 'approved',
    },
    {
      key: '11',
      id: 11,
      title: 'c',
      customer: 'e',
      duration: 33,
      maxPeople: 55,
      minAge: 2,
      price: 44,
      createdAt: '2-2-2019',
      tag: 'approved',
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
              // defaultPageSize: 6,
              showSizeChanger: false,
              onChange: e => {
                console.log(e);
              },
            }}
            bordered
            columns={columns}
            dataSource={data}
          />
        </Space>
      </div>
    </>
  );
}
