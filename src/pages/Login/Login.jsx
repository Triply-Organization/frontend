import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { login } from '../../app/loginSlice';
import bgLogin from '../../assets/images/bg-2.jpg';
import LanguageSelect from '../../components/LanguageSelect/LanguageSelect';
import './Login.scss';

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.login.loading);
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const [form] = Form.useForm();
  const onFinish = values => {
    dispatch(login(values));
  };

  const loadingContext = useLoadingContext();

  useEffect(() => {
    var src = bgLogin;
    var image = new Image();
    image.addEventListener('load', function () {
      document.getElementById('bgLogin').style.backgroundImage =
        'url(' + src + ')';
    });
    image.src = src;
    setTimeout(() => {
      loadingContext.done();
    }, 600);
  }, []);

  useEffect(() => {
    if (user && user.roles) {
      if (user.roles.includes('ROLE_ADMIN')) {
        navigate('/admin');
      } else if (user.roles.includes('ROLE_CUSTOMER')) {
        navigate(-1);
      } else if (user.roles.includes('ROLE_USER')) {
        navigate(-1);
      }
    }
  }, [user]);

  return (
    <div className="ctn ctn-login" id="bgLogin">
      <div className="ctn-login__login-form">
        <div className="ctn-login__login-form__title">
          <Title level={2}>{t('login.welcome_back')}</Title>
          <Text strong>{t('login.first_time_travel')}</Text>{' '}
          <Link to="/register">{t('login.register_now')}</Link>
        </div>
        <Form
          name="normal_login"
          className="form"
          size="large"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: `${t('login.email_invalid')}`,
              },
              {
                required: true,
                message: `${t('login.email_required')}`,
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
                message: `${t('login.pw_required')}`,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={t('login.password')}
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {t('login.login')}
            </Button>
          </Form.Item>
          <div className="ctn-login__multi-language">
            <LanguageSelect />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
