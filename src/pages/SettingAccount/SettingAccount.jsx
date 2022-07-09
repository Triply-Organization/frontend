import {
  ExclamationCircleOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Spin,
  Upload,
  message,
} from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoadingContext } from 'react-router-loading';

import { userAPI } from '../../api/userAPI';
import './SettingAccount.scss';

const { confirm } = Modal;

const SettingAccount = () => {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const [coverImg, setCoverImage] = useState({});
  const [loading, setLoading] = useState(false);
  const [isDisableSave, setDisableSave] = useState(true);
  const defaultValues = {
    role: userInfo?.roles[0],
    avatar: userInfo?.avatar,
    email: userInfo?.email,
    fullName: userInfo?.name,
    phone: userInfo?.phone,
    address: userInfo?.address,
  };
  const loadingContext = useLoadingContext();

  const { t } = useTranslation();

  const capitalizeText = text => {
    return (
      text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
  };

  useEffect(() => {
    setTimeout(() => {
      loadingContext.done();
    }, 1000);
  }, []);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const uploadCoverImage = async options => {
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    setLoading(true);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fmData.append('image[]', file);
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_BASE_URL + 'images/',
        fmData,
        config,
      );
      onSuccess('Ok');
      setLoading(false);
      const newCoverImg = {
        id: res.data.data[0]?.id,
        path: res.data.data[0]?.path,
      };
      setCoverImage(newCoverImg);
      localStorage.setItem(
        'user',
        JSON.stringify({ ...userInfo, avatar: newCoverImg?.path }),
      );
      console.log(res.data.data[0]);
    } catch (err) {
      console.log('Error: ', err);
      onError({ err });
    }
  };

  const submitHandler = async values => {
    console.log(values);
    const req = {
      address: values?.address,
      avatar: coverImg?.id,
      email: userInfo?.email,
      id: userInfo?.id,
      name: values?.fullName,
      phone: values?.phone,
      roles: [userInfo?.roles[0]],
    };
    try {
      await userAPI.editUser({
        id: userInfo?.id,
        body: req,
      });
      message.success({ content: 'Update Successfull!', key: 'success' });
      localStorage.setItem(
        'user',
        JSON.stringify({ ...req, avatar: coverImg?.path }),
      );
    } catch (error) {
      console.log(error);
      message.error({ content: 'Update Failed!', key: 'failed' });
    }
  };

  const onValuesChange = (changedValues, allValues) => {
    if (_.isEqual(allValues, defaultValues)) {
      setDisableSave(true);
    } else {
      setDisableSave(false);
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this account?',
      icon: <ExclamationCircleOutlined />,
      content: 'You are about to delete this account permanently.',
      okText: 'Delete permanently',
      okType: 'danger',
      cancelText: 'No',
      onOk() {},
      onCancel() {},
    });
  };

  return (
    <div className="setting-account-ctn">
      <div className="setting-account-wrapper">
        <div className="setting-account-wrapper__header">
          <div className="setting-account-wrapper__header__text">
            <h3>{t('my_profile.title')}</h3>
            <p>{t('my_profile.note')}</p>
          </div>
          <div>
            <Button type="text">{t('cta.cancle')}</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              disabled={isDisableSave}
            >
              {t('cta.save')}
            </Button>
          </div>
        </div>
        <div className="setting-account-wrapper__content">
          <div className="setting-account-wrapper__content__image">
            <h4>{t('my_profile.picture')}</h4>
            <div className="setting-account-wrapper__content__image__wrapper">
              <Space>
                <Spin spinning={loading}>
                  <Avatar
                    size={48}
                    icon={<UserOutlined />}
                    src={!coverImg.path ? userInfo?.avatar : coverImg?.path}
                  />
                </Spin>
                <div className="setting-account-wrapper__content__image__wrapper__info-wrapper">
                  <b>{defaultValues.fullName || defaultValues.email}</b>
                  <p>{capitalizeText(defaultValues.role)}</p>
                </div>
              </Space>
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={uploadCoverImage}
              >
                <Button icon={<UploadOutlined />}>
                  {t('cta.upload_photo')}
                </Button>
              </Upload>
            </div>
          </div>
          <Form
            form={form}
            onValuesChange={onValuesChange}
            initialValues={defaultValues}
            onFinish={submitHandler}
            name="setting_account"
            autoComplete="off"
            layout="vertical"
            className="setting-account-wrapper__content__form"
          >
            <Form.Item label={t('my_profile.form.full_name')} name="fullName">
              <Input />
            </Form.Item>
            <Form.Item
              label={t('my_profile.form.phone')}
              name="phone"
              rules={[{ min: 10, message: 'Your phone number is not correct' }]}
            >
              <Input type={'number'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label={t('my_profile.form.address')} name="address">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="setting-account-danger">
        <div className="setting-account-danger__header">
          <h3>{t('my_profile.danger.title')}</h3>
          <p>{t('my_profile.danger.danger_note')}</p>
        </div>
        <div className="setting-account-danger__content">
          <p>{t('my_profile.danger.content')}</p>
          <Button danger onClick={showDeleteConfirm}>
            {t('cta.delete_account')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingAccount;
