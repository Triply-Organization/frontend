import { Breadcrumb, Button, Space, Table, message } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { deleteTour, getToursCustomer } from '../../app/toursSlice';
import './CMSTours.scss';

const CMSTours = () => {
  const navigate = useNavigate();
  const data = useSelector(state => state.tours.toursCustomer);
  const loading = useSelector(state => state.tours.loading);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const loadingContext = useLoadingContext();
  const [disableDelete, setDisableDelete] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getToursCustomer());
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (_.isEmpty(selectedRowKeys)) setDisableDelete(true);
    else setDisableDelete(false);
  }, [selectedRowKeys]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          {record.status === 'disabled' ? //   type="primary" // <Button
          //   danger
          //   onClick={() => handleDelete(record.id)}>
          //   Reopen
          // </Button>
          null : (
            <Space>
              <Button
                type="primary"
                onClick={() => navigate(`/cms/set-schedule/${record.id}`)}
              >
                Set schedule
              </Button>
              <Button
                type="primary"
                onClick={() => navigate(`/cms/edit-tour/${record.id}`)}
              >
                Update tour
              </Button>
            </Space>
          )}
        </>
      ),
    },
  ];

  const onSelectChange = newSelectedRowKeys => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.status === 'disabled',
    }),
  };

  const handleDelete = id => {
    if (!_.isEmpty(selectedRowKeys)) {
      selectedRowKeys.forEach(item => dispatch(deleteTour(item)));
    }
    if (_.isEmpty(selectedRowKeys) && id) {
      dispatch(deleteTour(id));
    }
    dispatch(getToursCustomer());
    message.success('Delete successful');
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
            disabled={disableDelete}
            type="primary"
            size="large"
            icon={<AiOutlineDelete />}
            className="cms-content-btn"
            danger
            onClick={handleDelete}
          />
        </div>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          hideOnSinglePage: true,
          total: data?.length,
        }}
        rowSelection={rowSelection}
        rowClassName={record => record.status === 'disabled' && 'disabled-row'}
      />
    </>
  );
};

export default CMSTours;
