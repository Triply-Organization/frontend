import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Login.scss';
import { login } from './LoginSlice';

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.login.loading);
  const [form] = Form.useForm();
  const onFinish = values => {
    dispatch(login(values));
    form.resetFields();
  };

  return (
    <div className="ctn ctn-login">
      <div className="ctn-login__login-form">
        <div className="ctn-login__login-form__title">
          <Title level={2}>Welcome back</Title>
          <Text strong>First time travel ?</Text>{' '}
          <Link to="/register">Register now!</Link>
        </div>
        <Form
          name="normal_login"
          className="form"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      .
    </div>
  );
};

export default Login;
