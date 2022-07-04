import { UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Form,
  Input,
  Select,
  Space,
  Table,
} from 'antd';
import { Typography } from 'antd';
import { Modal } from 'antd';
import React, { useState } from 'react';

import ModalForm from '../../../components/ModalForm/ModalForm';
import './Users.scss';

const { Option } = Select;

const { confirm } = Modal;

const { Title } = Typography;

export default function Users() {
  const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);
  // Set current row value
  const [currentValue, setCurrentValue] = useState(false);
  const [formAddUser] = Form.useForm();
  const [formEditUser] = Form.useForm();

  // HANDLE ADD NEW USER
  const handleAddNewUser = () => {
    formAddUser
      .validateFields()
      .then(val => {
        console.log(val);
        // HANDLE LOGIC ADD NEW USER
      })
      .catch(err => console.log(err));
  };

  // HANDLE OPEN EDIT FORM
  const handleOpenEditForm = record => {
    setShowModalEdit(true);
    setCurrentValue(record);
  };

  const showConfirm = record => {
    confirm({
      title: 'Warning!',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you really want to delete this account?',

      onOk() {
        // HANDLE DELETE ACCOUNT
        console.log(record);
      },

      // onCancel() {
      //   console.log('Cancel');
      // },
    });
  };

  // HANDLE EDIT ROLE USER
  const handleEditRoleUser = () => {
    formEditUser
      .validateFields()
      .then(val => {
        // HANDLE LOGIC EDIT ROLE USER
        console.log(val, currentValue);
      })
      .catch(err => console.log(err));
  };

  // HANDLE CLOSE EDIT ROLE FORM
  const handleCloseEditRoleForm = () => {
    setShowModalEdit(false);
    formEditUser.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space size={'middle'}>
            <Button type="primary" onClick={() => handleOpenEditForm(record)}>
              Edit role
            </Button>
            <Button onClick={() => showConfirm(record)}>Delete</Button>
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
    <div className="user__wrapper">
      <ModalForm
        form={formAddUser}
        modalTitle="Add new user"
        formName="add-new-user"
        isVisible={isShowModalAdd}
        handleOk={handleAddNewUser}
        handleCancel={() => setShowModalAdd(false)}
        okText="Add"
        afterClose={() => formAddUser.resetFields()}
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
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input the user email!',
            },
            {
              pattern: new RegExp('/S+@S+.S+/'),
              message: 'Enter a valid email address!',
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
            {
              pattern: /^(?:\d*)$/,
              message: 'Input should contain just number!',
            },
          ]}
        >
          <Input />
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
      {/* MODAL EDIT */}
      <ModalForm
        form={formEditUser}
        modalTitle="Edit user's role"
        formName="edit-user"
        isVisible={isShowModalEdit}
        handleOk={handleEditRoleUser}
        handleCancel={handleCloseEditRoleForm}
        okText="Edit"
        // defaultValue={productToEdit}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Please choose the role!',
            },
          ]}
          name="role"
          label="Role"
        >
          <Select>
            <Option value="ROLE_ADMIN">Admin</Option>
            <Option value="ROLE_CUSTOMER">Customer</Option>
          </Select>
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
            Add new user
          </Button>
          <Table columns={columns} dataSource={data} />
        </Space>
      </div>
    </div>
  );
}
