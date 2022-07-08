import {
  Breadcrumb,
  Button,
  Collapse,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
  Upload,
  message,
} from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { AiOutlineInbox, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoadingContext } from 'react-router-loading';

import { createTour, getDestinationsServiceTours } from '../../app/toursSlice';
import './CMSAddTour.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Panel } = Collapse;
const { Dragger } = Upload;
const { Option } = Select;

const CMSAddTour = () => {
  const [duration, setDuration] = useState(null);
  const [coverImage, setCoverImage] = useState({});
  const [galleryImage, setGalleryImage] = useState([]);
  const [galleryImageOnChange, setGalleryImageonChange] = useState({});
  const destinations = useSelector(state => state.tours.destinations);
  const services = useSelector(state => state.tours.services);
  const idTourJustCreated = useSelector(state => state.tours.idTourJustCreated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingContext = useLoadingContext();

  const [form] = Form.useForm();

  useEffect(() => {
    if (
      (destinations && destinations.length === 0) ||
      (services && services.length === 0)
    ) {
      dispatch(getDestinationsServiceTours());
    }
    loadingContext.done();
  }, []);

  useEffect(() => {
    if (idTourJustCreated) {
      message.success({
        content: 'Create tour successful',
        key: 'create-tour',
      });
      navigate(`/cms/set-schedule/${idTourJustCreated}`);
    }
  }, [idTourJustCreated]);

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 10;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const onAddTour = values => {
    // Convert tourplans to array
    const propertyValues = Object.values(values.tourPlans);
    let resGallery = [];

    if (!_.isEmpty(galleryImage)) {
      // console.log(galleryImageOnChange);
      // Delete gallery image is removed
      resGallery = galleryImage.filter(function (o1) {
        return galleryImageOnChange.fileList.some(function (o2) {
          // console.log(galleryImage);
          return o1.file.uid === o2.uid; // return the ones with equal id
        });
      });
    }
    const response = {
      ...values,
      tourImages: [{ ...coverImage }, ...resGallery],
      tourPlans: propertyValues.map((item, index) => ({
        ...item,
        day: index + 1,
      })),
    };
    form.resetFields();
    dispatch(createTour(response));
  };

  const uploadCoverImage = async options => {
    const { onSuccess, onError, file } = options;
    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fmData.append('image[]', file);
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_BASE_URL,
        fmData,
        config,
      );
      onSuccess('Ok');
      const tempCoverImg = {
        id: res.data.data[0]?.id,
        type: 'cover',
        file,
      };
      setCoverImage(tempCoverImg);
    } catch (err) {
      console.log('Eroor: ', err);
      onError({ err });
    }
  };

  const uploadGalleryImage = async options => {
    const { onSuccess, onError, file } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    fmData.append('image[]', file);
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_BASE_URL,
        fmData,
        config,
      );
      onSuccess('Ok');
      const tempCoverImg = {
        id: res.data.data[0]?.id,
        type: 'gallery',
        file,
      };
      setGalleryImage([...galleryImage, tempCoverImg]);
    } catch (err) {
      console.log('Eroor: ', err);
      onError({ err });
    }
  };

  return (
    <>
      <Breadcrumb
        style={{
          margin: '16px 0',
        }}
      >
        <Breadcrumb.Item>
          <Link to="/home">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/cms/tours">Tours</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Add Tour</Breadcrumb.Item>
      </Breadcrumb>

      <Form
        form={form}
        className="form-tour"
        name="form-tour"
        onFinish={onAddTour}
        layout="vertical"
        autoComplete="off"
      >
        <div className="form-tour__content__left">
          <div className="form-tour__control-header">
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
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<AiOutlinePlus />}
                  htmlType="submit"
                  className="form-tour__control-header__btn"
                >
                  Add now
                </Button>
                <Button
                  size="large"
                  className="form-tour__control-header__btn"
                  onClick={() => navigate('/cms/tours')}
                >
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </div>

          <div className="card-container">
            <Tabs type="card">
              <TabPane tab="Infomation" key="1" className="card__tab-pane">
                <Space className="form-tour__space-number" size={'large'}>
                  <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your tour duration!',
                      },
                    ]}
                  >
                    <InputNumber
                      onChange={e => setDuration(e)}
                      min={1}
                      max={30}
                      size="large"
                      placeholder="1"
                      addonAfter="days"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
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

                <Collapse
                  defaultActiveKey={['1']}
                  style={{ marginBottom: '1rem' }}
                >
                  <Panel header="Images" key="1">
                    <Form.Item
                      style={{ padding: '0 1rem' }}
                      label="Cover image"
                      name={['tourImages', 'cover']}
                    >
                      <Dragger
                        multiple={false}
                        maxCount={1}
                        customRequest={uploadCoverImage}
                        beforeUpload={beforeUpload}
                        listType="picture"
                      >
                        <p className="ant-upload-drag-icon">
                          <AiOutlineInbox />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag png/jpeg to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          This image will be used to display as the cover photo
                          of your tour. It will show up on the tour card
                          interface.
                        </p>
                      </Dragger>
                    </Form.Item>
                    <Form.Item
                      label="Gallery"
                      name={['tourImages', 'gallery']}
                      style={{ padding: '0 1rem' }}
                    >
                      <Dragger
                        multiple={true}
                        beforeUpload={beforeUpload}
                        customRequest={uploadGalleryImage}
                        listType="picture"
                        onChange={e => setGalleryImageonChange(e)}
                        maxCount={5}
                      >
                        <p className="ant-upload-drag-icon">
                          <AiOutlineInbox />
                        </p>
                        <p className="ant-upload-text">
                          Click or drag png/jpeg to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                          You can post many detailed images of your tour, it
                          will help people understand your tour.
                        </p>
                      </Dragger>
                    </Form.Item>
                  </Panel>
                </Collapse>
              </TabPane>

              <TabPane tab="Tour plan" key="2">
                <Collapse defaultActiveKey={['1']}>
                  {Array.from(Array(duration), (_, i) => {
                    return (
                      <Panel header={`Day ${i + 1}`} key={i + 1}>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Title"
                          name={['tourPlans', `${i + 1}`, 'title']}
                          rules={[
                            {
                              required: true,
                              message: `Please input title of day ${i + 1}`,
                            },
                          ]}
                        >
                          <Input
                            style={{ resize: 'none' }}
                            rows={3}
                            size="large"
                          />
                        </Form.Item>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Destination"
                          name={['tourPlans', i + 1, 'destination']}
                          rules={[
                            {
                              required: true,
                              message: `Please input Description your tour plan day ${
                                i + 1
                              }`,
                            },
                          ]}
                        >
                          <Select size="large">
                            {destinations.map((item, index) => {
                              return (
                                <Option key={index} value={item.id}>
                                  {item.name}
                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          style={{ padding: '0 1rem' }}
                          label="Description"
                          name={['tourPlans', i + 1, 'description']}
                          rules={[
                            {
                              required: true,
                              message: `Please input Description your tour plan day ${
                                i + 1
                              }`,
                            },
                          ]}
                        >
                          <TextArea
                            style={{ resize: 'none' }}
                            rows={3}
                            size="large"
                          />
                        </Form.Item>
                      </Panel>
                    );
                  })}
                </Collapse>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Form>
    </>
  );
};

export default CMSAddTour;
