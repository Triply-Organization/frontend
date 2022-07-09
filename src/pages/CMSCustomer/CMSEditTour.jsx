import { CloudSyncOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import {
  getDestinationsServiceTours,
  getDetailTour,
  updateTour,
} from '../../app/toursSlice';
import './CMSEditTour.scss';

const CMSEditTour = () => {
  const { TabPane } = Tabs;
  const { Option } = Select;

  const dispatch = useDispatch();
  const services = useSelector(state => state.tours.services);
  const tour = useSelector(state => state.tours.tour);
  const loading = useSelector(state => state.tours.loading);

  const loadingContext = useLoadingContext();
  const { id } = useParams();
  const [formInformation] = Form.useForm();

  const [valueInformation, setValueInformation] = useState({});
  const [disableUpdateInfomation, setDisableUpdateInfomation] = useState(true);

  useEffect(() => {
    if (_.isEmpty()) {
      dispatch(getDestinationsServiceTours());
    }
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (id) dispatch(getDetailTour(id));
    loadingContext.done();
  }, [id]);

  useEffect(() => {
    if (!_.isEmpty(tour)) {
      const valueFormInformation = {
        title: tour.title,
        maxPeople: tour.maxPeople,
        minAge: tour.minAge,
        overview: tour.overView,
        services: tour.services.map(item => item.id),
      };

      formInformation.setFieldsValue(valueFormInformation);
      setValueInformation(valueFormInformation);
    }
  }, [tour]);

  const onChangeValueInfomation = (changedValues, values) => {
    if (_.isEqual(values, valueInformation)) setDisableUpdateInfomation(true);
    else setDisableUpdateInfomation(false);
  };

  const onEditInformation = values => {
    const newService = values.services.filter(
      x => !valueInformation.services.includes(x),
    );
    const deletedService = valueInformation.services.filter(
      x => !values.services.includes(x),
    );
    const servicesParams = {
      newServiceToTour: newService,
      deleteServiceFromTour: deletedService,
    };
    values.services = servicesParams;
    const params = {
      id: id,
      body: values,
    };

    dispatch(updateTour(params));
    setDisableUpdateInfomation(true);
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cms/tours">Tours</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Tour</Breadcrumb.Item>
      </Breadcrumb>

      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Infomation" key="1" className="card__tab-pane">
            <Form
              onValuesChange={onChangeValueInfomation}
              form={formInformation}
              name="form-edit-tour"
              onFinish={onEditInformation}
              layout="vertical"
              autoComplete="off"
            >
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please input your tour title!',
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Tour title"
                  style={{ width: '500px' }}
                />
              </Form.Item>

              <Space className="form-edit__space-number" size={'large'}>
                <Form.Item
                  label="Max People"
                  name="maxPeople"
                  rules={[
                    {
                      required: true,
                      message: 'Please input max people!',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={30}
                    size="large"
                    placeholder="1"
                    style={{ width: 200 }}
                  />
                </Form.Item>
                <Form.Item
                  label="Min Age"
                  name="minAge"
                  rules={[
                    {
                      required: true,
                      message: 'Please input min age of tour!',
                    },
                  ]}
                >
                  <Select size="large" style={{ width: 200 }}>
                    <Option value={0}>0</Option>
                    <Option value={12}>12</Option>
                    <Option value={18}>18</Option>
                  </Select>
                </Form.Item>
              </Space>

              <Form.Item
                label="Overview"
                name="overview"
                rules={[
                  {
                    required: true,
                    message: 'Please input overview your tour!',
                  },
                ]}
              >
                <TextArea
                  style={{ resize: 'none' }}
                  rows={3}
                  size="large"
                  placeholder="Tell about your tour..."
                />
              </Form.Item>

              <Form.Item
                label="Servies"
                name="services"
                rules={[
                  {
                    required: true,
                    message: 'Select your services of tour',
                  },
                ]}
              >
                <Select size="large" mode="multiple">
                  {services.map((item, index) => {
                    return (
                      <Option key={index} value={parseInt(item.id)}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={disableUpdateInfomation}
                  loading={loading}
                  block
                  type="primary"
                  size="large"
                  icon={<CloudSyncOutlined />}
                  htmlType="submit"
                >
                  Update now
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default CMSEditTour;
