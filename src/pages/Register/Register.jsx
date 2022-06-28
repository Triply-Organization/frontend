import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Steps,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.scss';

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

const Register = () => {
  const [current, setCurrent] = useState(0);
  // const [value, setValue] = useState({});
  const [form] = Form.useForm();

  const steps = [
    {
      title: 'Give us your info 😉',
    },
    {
      title: 'Choose your Role 🤤',
    },
  ];

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 24,
      },
    },
  };

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="ctn ctn-register">
      <div className="ctn-register__register-form">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {current === 0 ? (
          <>
            <div className="ctn-register__register-form__title">
              <Title level={2}>Register</Title>
            </div>
            <Form
              {...formItemLayout}
              layout="vertical"
              name="register"
              onFinish={onFinish}
              form={form}
              scrollToFirstError
            >
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!',
                        ),
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Row gutter={8}>
                <Col xxl={12} sm={12} xs={24}>
                  <Form.Item
                    name="name"
                    label="Name"
                    tooltip="What do you want others to call you?"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xxl={12} sm={12} xs={24}>
                  <Form.Item name="address" label="Address">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    type: 'number',
                    message: 'The input is not a number',
                  },
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <InputNumber
                  controls={false}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={() => setCurrent(current + 1)}
                  className="register-form-next"
                  htmlType="submit"
                  type="primary"
                >
                  {/* {Form.validate} */}Submit
                </Button>
                <Link to="/login">Already have account?</Link>
              </Form.Item>
            </Form>
          </>
        ) : (
          <>
            <div className="ctn-register__register-form__title">
              <Title level={2}>You want to be ?</Title>
            </div>

            <Form onFinish={onFinish} form={form}>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Please select role!',
                  },
                ]}
              >
                <Select size="large" placeholder="Select your role">
                  <Option value="ROLE_CUSTOMER">Customer</Option>
                  <Option value="ROLE_USER">User</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  className="register-form-prev"
                  onClick={() => setCurrent(current - 1)}
                >
                  Prev
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="register-form-submit"
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
