/* eslint-disable no-unused-vars */
import { UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Form,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from 'antd';
import { Typography } from 'antd';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { getAllUsers } from '../../../app/AdminSlice';
import ModalForm from '../../../components/ModalForm/ModalForm';

const { Option } = Select;

const { confirm } = Modal;

const { Title } = Typography;

export default function Users() {
  const dispatch = useDispatch();
  // const usersData = useSelector(state => state.admin.usersData.users)
  const isLoading = useSelector(state => state.admin.usersData.loading);
  const totalUsers = useSelector(state => state.admin.usersData.totalUsers);

  // const [isShowModalAdd, setShowModalAdd] = useState(false);
  const [isShowModalEdit, setShowModalEdit] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  // GET PAGINATION ...
  const [page, setPage] = useState(searchParams.get('page') || 1);
  // GET TOUR DATA

  // FLAG PREVENT CALL API TWICE
  const [flag, setFlag] = useState(0);

  // Set current row value
  const [currentValue, setCurrentValue] = useState(false);
  // const [formAddUser] = Form.useForm();
  const [formEditUser] = Form.useForm();
  const loadingContext = useLoadingContext();

  const loading = async () => {
    //loading some data
    if (!searchParams.get('page')) {
      setSearchParams({ page });
    }
    // dispatch(getAllUsers(location.search));
    console.log('GET ALL USERS WHEN FIRST COME');
    //call method to indicate that loading is done
    loadingContext.done();
  };

  useEffect(() => {
    loading();
    setFlag(flag + 1);
  }, []);

  useEffect(() => {
    if (flag !== 0) {
      setSearchParams({ page });
      console.log('GET ALL USERS WHEN CHANGE PAGE');
      // dispatch(getAllUsers(location.search));
    }
  }, [page]);

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
    <Spin
      tip="loading..."
      spinning={false}
      // spinning={isLoading}
      style={{
        marginTop: '100px',
      }}
    >
      {/* MODAL EDIT */}
      <ModalForm
        form={formEditUser}
        modalTitle="Edit user's role"
        formName="edit-user"
        isVisible={isShowModalEdit}
        handleOk={handleEditRoleUser}
        handleCancel={handleCloseEditRoleForm}
        okText="Edit"
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
          <Row>
            <Col span={24}>
              <Table
                size="large"
                pagination={{
                  current: page,
                  total: totalUsers,
                  pageSize: 6,
                  showSizeChanger: false,
                  onChange: e => {
                    setPage(e);
                  },
                }}
                columns={columns}
                dataSource={data}
              />
            </Col>
          </Row>
        </Space>
      </div>
    </Spin>
  );
}
