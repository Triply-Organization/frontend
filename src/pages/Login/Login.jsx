import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './Login.scss';
import './LoginSlice';
import { addNewUser } from './LoginSlice';

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    dispatch(addNewUser(values));
  };

  return (
    <div className="ctn ctn-login">
      <div className="ctn-login__login-form">
        <div className="ctn-login__login-form__title">
          <Title level={2}>Login</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          form={form}
          initialValues={{
            remember: true,
          }}
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
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
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
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
