import { Breadcrumb, Button, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { tourAPI } from '../../api/tourAPI';
import './CMSTours.scss';

const CMSTours = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const loadingContext = useLoadingContext();
  // Handle
  // const onEditTour = tour => {
  //   console.log(tour);
  // };

  // const deleteTour = () => {

  // }

  useEffect(() => {
    const loading = async () => {
      try {
        const response = await tourAPI.getToursOfCustomer();

        const tempData = response.data.data.map(item => ({
          id: item.id,
          key: item.id,
          title: item.title,
          destination: item.destination[0],
          duration: item.duration,
          availableDay: item.schedule,
          max_people: item.maxPeople,
          min_age: item.minAge,
          createdAt: moment(item.createdAt.date).format('YYYY-MM-DD'),
        }));
        setData(tempData);
      } catch (error) {
        console.log(error);
      }
    };
    loading();
    loadingContext.done();
  }, []);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: text => (
        <Button type="link" style={{ padding: '0' }}>
          {text}
        </Button>
      ),
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
      title: 'Available Day',
      dataIndex: 'availableDay',
      key: 'availableDay',
      width: 150,
      render: text => `${text} day`,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'price',
    },
    {
      title: 'Action',
      dataIndex: 'x',
      key: 'x',
      render: (_, record) => (
        <Space>
          <Button
            type="ghost"
            onClick={() => navigate(`/cms/edit-tour/${record.id}`)}
          >
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

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
          hideOnSinglePage: true,
          total: data?.length,
        }}
        rowSelection={rowSelection}
      />
    </>
  );
};

export default CMSTours;
