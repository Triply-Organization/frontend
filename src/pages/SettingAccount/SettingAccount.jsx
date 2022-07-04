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
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

import './SettingAccount.scss';

const { confirm } = Modal;

const SettingAccount = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isDisableSave, setDisableSave] = useState(true);
  const defaultValues = {
    role: 'CUSTOMER',
    avatar: '',
    email: 'ddkhoa1206@gmail.com',
    fullName: '',
    phone: '012039102932',
    address: 'Vietnam',
  };

  const capitalizeText = text => {
    return (
      text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    );
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValues);
  }, [form, defaultValues]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const submitHandler = values => {
    console.log(values);
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
      onOk() {
        console.log('Delete');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <div className="setting-account-ctn">
      <div className="setting-account-wrapper">
        <div className="setting-account-wrapper__header">
          <div className="setting-account-wrapper__header__text">
            <h3>Profile</h3>
            <p>Settings for your personal profile</p>
          </div>
          <div>
            <Button type="text">Cancel</Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              disabled={isDisableSave}
            >
              Save changes
            </Button>
          </div>
        </div>
        <div className="setting-account-wrapper__content">
          <div className="setting-account-wrapper__content__image">
            <h4>Profile picture</h4>
            <div className="setting-account-wrapper__content__image__wrapper">
              <Space>
                <Spin spinning={loading}>
                  <Avatar size={48} icon={<UserOutlined />} src={imageUrl} />
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
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined />}>Upload photo</Button>
              </Upload>
            </div>
          </div>
          <div className="setting-account-wrapper__content__google">
            <FcGoogle style={{ fontSize: '28px' }} />
            <p>
              This account is connected to your Google account. Your detail can
              only be changed from the Google account
            </p>
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
            <Form.Item label="Full name" name="fullName">
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ min: 10, message: 'Your phone number is not correct' }]}
            >
              <Input type={'number'} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="setting-account-danger">
        <div className="setting-account-danger__header">
          <h3>Danger zone</h3>
          <p>Delete your account</p>
        </div>
        <div className="setting-account-danger__content">
          <p>
            By deleting your account you will lose all your data and access to
            any tours that you are booked.
          </p>
          <Button danger onClick={showDeleteConfirm}>
            Delete this account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingAccount;
