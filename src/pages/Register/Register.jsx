import { Button, Col, Form, Input, Row, Select, Steps, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useStepsForm } from 'sunflower-antd';

import { clearSuccess, register } from '../../app/registerSlice';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import './Register.scss';

const { Option } = Select;
const { Title } = Typography;
const { Step } = Steps;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.register.loading);
  const isSuccess = useSelector(state => state.register.isSuccess);

  const { t } = useTranslation();

  const { form, current, gotoStep, stepsProps, formProps, submit } =
    useStepsForm({
      async submit(values) {
        let newValues = { ...values, roles: [values.roles] };
        dispatch(register(newValues));
        await new Promise(r => setTimeout(r, 1000));
      },
      total: 2,
    });

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearSuccess());
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  }, [isSuccess]);

  const formList = [
    <>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: `${t('register.email_invalid')}`,
          },
          {
            required: true,
            message: `${t('register.email_required')}`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('register.password')}
        rules={[
          {
            required: true,
            message: `${t('register.pw_required')}`,
          },
          {
            pattern:
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            message: `${t('register.pw_invalid')}`,
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label={t('register.confirmed_password')}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: `${t('register.pw_confirmed')}`,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error(`${t('register.pw_confirmed_invalid')}`),
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
            label={t('register.name')}
            tooltip={t('register.nickname')}
            rules={[
              {
                required: true,
                message: `${t('register.name_required')}`,
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xxl={12} sm={12} xs={24}>
          <Form.Item name="address" label={t('register.address')}>
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="phone"
        label={t('register.phone')}
        rules={[
          {
            pattern: /^(?:\d*)$/,
            message: `${t('register.phone_invalid')}`,
          },
          {
            required: true,
            message: `${t('register.phone_required')}`,
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
          {t('register.next')}
        </Button>
        <Link to="/login"> {t('register.already_have_account')}</Link>
      </Form.Item>
    </>,

    <>
      <Form.Item
        name="roles"
        rules={[
          {
            required: true,
            message: `${t('register.select_role_required')}`,
          },
        ]}
      >
        <Select
          size="large"
          placeholder={t('register.you_go_here_for')}
          style={{ borderRadius: '1rem' }}
        >
          <Option value="ROLE_USER">{t('register.become_a_traveler')}</Option>
          <Option value="ROLE_CUSTOMER">
            {t('register.to_marketing_your_tour')}
          </Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          className="register-form-prev"
          onClick={() => gotoStep(current - 1)}
        >
          {t('register.prev')}
        </Button>
        <Button
          loading={loading}
          type="primary"
          onClick={() => {
            submit().then(result => console.log(result));
          }}
          className="register-form-submit"
        >
          {t('register.register')}
        </Button>
      </Form.Item>
    </>,
  ];

  const steps = [
    {
      title: `${t('register.give_us_more_info')}`,
    },
    {
      title: `${t('register.come_here_for')}`,
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
            {current === 0
              ? `${t('register.create_account')}`
              : `${t('register.you_want_to_be')}`}
          </Title>
        </div>
        <Form
          {...formItemLayout}
          layout="vertical"
          labelCol={{ span: 12 }}
          name="register"
          size="large"
          form={form}
          scrollToFirstError
          {...formProps}
        >
          {formList[current]}
        </Form>
        <div className="ctn-register__multi-language">
          <LanguageSelect />
        </div>
      </div>
    </div>
  );
};

export default Register;
