import { Breadcrumb, Button, Layout, Menu, Table } from 'antd';
import React from 'react';
import {
  AiFillDashboard,
  AiOutlineDelete,
  AiOutlinePlus,
  AiOutlineUnorderedList,
} from 'react-icons/ai';

import './CMSCustomer.scss';

const { Content, Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const CMSCustomer = () => {
  const data = [
    {
      id: '1',
      title: 'Caño Cristales River Trip',
      destination: 'Bryce Canyon National Park, USA',
      duration: 4,
      max_people: 40,
      min_age: 13,
      price: 100,
    },
  ];

  const itemSider = [
    getItem('Dashboard', 'sub1', <AiFillDashboard />),
    getItem('Tours', 'sub2', <AiOutlineUnorderedList />),
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
    <Layout style={{ height: '100vh' }}>
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['sub1']}
          style={{
            height: '100%',
            borderRight: 0,
          }}
          items={itemSider}
        />
      </Sider>
      <Layout
        style={{
          padding: '0 24px 24px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>CMS</Breadcrumb.Item>
        </Breadcrumb>
        <Content className="cms-content">
          <div className="cms-content__action">
            <Button
              type="primary"
              size="large"
              icon={<AiOutlinePlus />}
              className="cms-content__btn"
            >
              Add new tour
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<AiOutlineDelete />}
              className="cms-content__btn"
              danger
            />
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default CMSCustomer;
