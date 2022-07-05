import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Form, Input, Space, Table } from 'antd';
import { Typography } from 'antd';
import React, { useState } from 'react';

import ModalForm from '../../../components/ModalForm/ModalForm';
import './Customers.scss';

const { Title } = Typography;

export default function Customers() {
  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  const formAddUser = Form.useFormInstance();
  const formEditUser = Form.useFormInstance();

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
            <Button type="primary" onClick={() => setShowModalEdit(true)}>
              Edit
            </Button>
            <Button>Delete</Button>
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
    <div className="customer__wrapper">
      <ModalForm
        form={formAddUser}
        modalTitle="Add new customer"
        formName="add-new-customer"
        isVisible={isShowModalAdd}
        handleOk={() => console.log(123)}
        handleCancel={() => setShowModalAdd(false)}
        okText="Add"
        // defaultValue={productToEdit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the customer name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Input type="file" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input the customer email!',
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please input the customer phone!',
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the customer address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </ModalForm>
      {/* MODAL EDIT */}
      <ModalForm
        form={formEditUser}
        modalTitle="Edit user"
        formName="edit-user"
        isVisible={isShowModalEdit}
        handleOk={() => console.log(123)}
        handleCancel={() => setShowModalEdit(false)}
        okText="Add"
        // defaultValue={productToEdit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the user name!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Input type="file" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input the user email!',
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {
              required: true,
              message: 'Please input the user phone!',
            },
          ]}
        >
          <Input type="tel" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the user address!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </ModalForm>
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
          <Button
            type="primary"
            size="large"
            onClick={() => setShowModalAdd(true)}
          >
            Add new customer
          </Button>
          <Table columns={columns} dataSource={data} />
        </Space>
      </div>
    </div>
  );
}
