import { Button, Col, Form, Input, Row, Select, Steps, Typography } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStepsForm } from 'sunflower-antd';

import './Register.scss';
import { register } from './RegisterSlice';

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

const Register = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.register.loading);

  const { form, current, gotoStep, stepsProps, formProps, submit } =
    useStepsForm({
      async submit(values) {
        let newValues = { ...values, roles: [values.roles] };
        dispatch(register(newValues));
        await new Promise(r => setTimeout(r, 1000));
        return 'ok';
      },
      total: 2,
    });

  const formList = [
    <>
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
          {
            pattern:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            message:
              'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
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
                new Error('The two passwords that you entered do not match!'),
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
            pattern: /^(?:\d*)$/,
            message: 'Input should contain just number!',
          },
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          controls={false}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item>
        <Button
          onClick={() => gotoStep(current + 1)}
          className="register-form-next"
          type="primary"
        >
          Next
        </Button>
        <Link to="/login">Already have account?</Link>
      </Form.Item>
    </>,

    <>
      <Form.Item
        name="roles"
        rules={[
          {
            required: true,
            message: 'Please select role!',
          },
        ]}
      >
        <Select
          size="large"
          placeholder="You go here for ..."
          style={{ borderRadius: '1rem' }}
        >
          <Option value="ROLE_USER">Be come a traveler</Option>
          <Option value="ROLE_CUSTOMER">To marketing your tour</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          className="register-form-prev"
          onClick={() => gotoStep(current - 1)}
        >
          Prev
        </Button>
        <Button
          loading={loading}
          type="primary"
          onClick={() => {
            submit().then(result => console.log(result));
          }}
          className="register-form-submit"
        >
          Register
        </Button>
      </Form.Item>
    </>,
  ];

  const steps = [
    {
      title: 'Give us your info',
    },
    {
      title: 'Come here for ?',
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

  return (
    <div className="ctn ctn-register">
      <div className="ctn-register__register-form">
        <Steps progressDot {...stepsProps}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="ctn-register__register-form__title">
          <Title level={2}>
            {current === 0 ? ' Create account' : ' You want to be ?'}
          </Title>
        </div>
        <Form
          {...formItemLayout}
          layout="vertical"
          name="register"
          size="large"
          form={form}
          scrollToFirstError
          {...formProps}
        >
          {formList[current]}
        </Form>
      </div>
    </div>
  );
};

export default Register;
