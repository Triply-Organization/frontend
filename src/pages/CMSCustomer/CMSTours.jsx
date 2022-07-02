import { Breadcrumb, Button, DatePicker, Space, Table } from 'antd';
import React from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

import './CMSTours.scss';

const CMSTours = () => {
  const navigate = useNavigate();
  // Handle
  const onEditTour = tour => {
    console.log(tour);
  };

  // Config table
  const data = [
    {
      id: '1',
      title: 'Caño Cristales River Trip',
      destination: 'Bryce Canyon National Park, USA',
      duration: 4,
      availableDay: 4,
      max_people: 40,
      min_age: 13,
      price: 100,
    },
  ];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => <Button type="link">{text}</Button>,
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Available Day',
      dataIndex: 'availableDay',
      key: 'availableDay',
      render: text => `${text} day`,
    },
    {
      title: 'Action',
      dataIndex: 'x',
      key: 'x',
      render: (_, record) => (
        <Space>
          <Button type="ghost" onClick={() => onEditTour(record)}>
            Edit
          </Button>
          <Button
            type="ghost"
            onClick={() => navigate(`/cms/set-schedule/${record.id}`)}
          >
            Set schedule
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tours</Breadcrumb.Item>
      </Breadcrumb>
      <div className="cms-content-header">
        <h2>Tours</h2>
        <div>
          <Button
            type="primary"
            size="large"
            icon={<AiOutlinePlus />}
            onClick={() => navigate('/cms/add-tour')}
            className="cms-content-btn"
          >
            Add new tour
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<AiOutlineDelete />}
            className="cms-content-btn"
            danger
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
      />

      <DatePicker disabledDate={'2022-07-02'} />
    </>
  );
};

export default CMSTours;
