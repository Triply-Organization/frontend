import { Button, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './MyTour.scss';

const MyTour = () => {
  const dataSource = [
    {
      key: '1',
      title: 'Vietname - Ha Long Bay',
      price: '$100',
      discount: '$0',
      amountDue: '$100',
      status: 'completed',
    },
    {
      key: '2',
      title: 'Vietname - Da Nang',
      price: '$200',
      discount: '$100',
      amountDue: '$100',
      status: 'pending',
    },
  ];
  const columns = [
    {
      title: 'Name of tour',
      dataIndex: 'title',
      key: 'title',
      render: text => <Link to={''}>{text}</Link>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Amount Due',
      dataIndex: 'amountDue',
      key: 'amountDue',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => (
        <>
          <Tag
            color={status === 'completed' ? 'success' : 'error'}
            key={status}
          >
            {status.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: (
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          Review
          <Tooltip title={'Review to be decreased 5% next time '}>
            <AiOutlineQuestionCircle color="gray" />
          </Tooltip>
        </p>
      ),
      dataIndex: 'x',
      key: 'x',
      render: (_, record) => {
        if (record.status === 'completed')
          return <Button type="primary">Review now</Button>;
      },
    },
  ];
  return (
    <div className="my-tour">
      <h2 className="my-tour__title">My Tour</h2>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default MyTour;
